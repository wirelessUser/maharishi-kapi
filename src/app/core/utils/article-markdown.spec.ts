import { renderArticleMarkdown as render } from './article-markdown';

describe('renderArticleMarkdown', () => {
  it('returns nothing for empty input', () => {
    expect(render('')).toBe('');
    expect(render('   \n ')).toBe('');
    expect(render(null)).toBe('');
    expect(render(undefined)).toBe('');
  });

  it('renders headings one level below the article title', () => {
    expect(render('# Big')).toContain('<h2>Big</h2>');
    expect(render('## Heading')).toContain('<h3>Heading</h3>');
    expect(render('### Subheading')).toContain('<h4>Subheading</h4>');
    expect(render('###### Deepest')).toContain('<h6>Deepest</h6>');
  });

  it('renders emphasis, lists, quotes and dividers', () => {
    expect(render('**bold** and *italic*')).toContain('<strong>bold</strong> and <em>italic</em>');
    expect(render('- one\n- two')).toMatch(/<ul>\s*<li>one<\/li>\s*<li>two<\/li>\s*<\/ul>/);
    expect(render('1. one\n2. two')).toMatch(/<ol>\s*<li>one<\/li>\s*<li>two<\/li>\s*<\/ol>/);
    expect(render('> Wisdom')).toMatch(/<blockquote>\s*<p>Wisdom<\/p>\s*<\/blockquote>/);
    expect(render('above\n\n---\n\nbelow')).toContain('<hr>');
  });

  it('starts a paragraph at a blank line and a line break at a single newline', () => {
    const html = render('first line\nsecond line\n\nnext paragraph');
    expect(html).toContain('<p>first line<br>second line</p>');
    expect(html).toContain('<p>next paragraph</p>');
  });

  it('opens external links in a new tab without leaking the opener', () => {
    expect(render('[Kapi](https://example.com/a?x=1&y=2)')).toContain(
      '<a href="https://example.com/a?x=1&amp;y=2" target="_blank" rel="noopener noreferrer">Kapi</a>',
    );
  });

  it('keeps internal, anchor and mail links in the same tab', () => {
    expect(render('[courses](/courses)')).toContain('<a href="/courses">courses</a>');
    expect(render('[top](#top)')).toContain('<a href="#top">top</a>');
    expect(render('[write](mailto:hello@example.com)')).toContain('<a href="mailto:hello@example.com">write</a>');
  });

  it('drops links that could run script but keeps their text', () => {
    const attempts = [
      '[x](javascript:alert(1))',
      '[x](JaVaScRiPt:alert(1))',
      '[x](<java\tscript:alert(1)>)',
      '[x](data:text/html;base64,PHNjcmlwdD4=)',
      '[x](vbscript:msgbox(1))',
    ];
    for (const source of attempts) {
      const html = render(source);
      expect(html, source).not.toContain('<a');
      expect(html, source).not.toContain('href');
      expect(html, source).toContain('x');
    }
  });

  it('renders images from web addresses and shows only the alt text for anything else', () => {
    expect(render('![Temple](https://cdn.test/temple.jpg)')).toContain('<img src="https://cdn.test/temple.jpg" alt="Temple" loading="lazy">');
    expect(render('![Temple](/media/temple.jpg)')).toContain('<img src="/media/temple.jpg" alt="Temple" loading="lazy">');
    expect(render('![Sneaky](javascript:alert(1))')).not.toContain('<img');
    expect(render('![Sneaky](data:image/svg+xml;base64,AAAA)')).not.toContain('<img');
    expect(render('![Sneaky](javascript:alert(1))')).toContain('Sneaky');
  });

  it('escapes special characters in alt text and titles', () => {
    const html = render('![a & <b> "q"](https://cdn.test/a.png "say \\"hi\\"")');
    expect(html).toContain('alt="a &amp; &lt;b&gt; &quot;q&quot;"');
    expect(html).not.toContain('<b>');
  });

  it('never renders raw HTML typed into the source', () => {
    const script = render('<script>alert(1)</script>');
    expect(script).not.toContain('<script');
    expect(script).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');

    const inline = render('hello <img src=x onerror=alert(1)> world');
    expect(inline).not.toContain('<img');
    expect(inline).toContain('&lt;img src=x onerror=alert(1)&gt;');

    expect(render('some <b>bold</b> text')).toContain('&lt;b&gt;bold&lt;/b&gt;');
  });

  it('leaves plain text articles readable', () => {
    const html = render('A single paragraph of plain text.');
    expect(html.trim()).toBe('<p>A single paragraph of plain text.</p>');
  });

  it('keeps one paragraph per line for older plain-text articles', () => {
    const html = render('First paragraph.\nSecond paragraph.\r\nThird paragraph.');
    expect(html.match(/<p>/g)).toHaveLength(3);
    expect(html).not.toContain('<br>');
    expect(html).toContain('<p>Second paragraph.</p>');
  });

  it('still applies inline formatting inside those one-line paragraphs', () => {
    const html = render('Read **this** first.\nThen visit [Kapi](https://example.com).');
    expect(html.match(/<p>/g)).toHaveLength(2);
    expect(html).toContain('<strong>this</strong>');
    expect(html).toContain('target="_blank"');
  });

  it('uses normal Markdown line rules once there is a blank line or block syntax', () => {
    expect(render('one\ntwo\n\nthree')).toContain('<p>one<br>two</p>');
    expect(render('## Title\nline a\nline b')).toMatch(/<h3>Title<\/h3>\s*<p>line a<br>line b<\/p>/);
    expect(render('- a\n- b')).toMatch(/<ul>\s*<li>a<\/li>\s*<li>b<\/li>\s*<\/ul>/);
    expect(render('> quoted\n> lines')).toContain('<blockquote>');
    expect(render('```\ncode\n```')).toContain('<pre>');
  });
});
