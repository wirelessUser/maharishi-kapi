import {
  IMAGE_SCHEMES,
  TextEdit,
  applyEdit,
  formatLines,
  insertDivider,
  insertImage,
  insertLink,
  normalizeUrl,
  wrapInline,
} from './markdown-format';

const run = (text: string, edit: TextEdit) => ({
  text: applyEdit(text, edit),
  selected: applyEdit(text, edit).slice(edit.selectStart, edit.selectEnd),
});

describe('wrapInline', () => {
  it('wraps the selection and keeps it selected', () => {
    const result = run('a wise word here', wrapInline('a wise word here', 2, 6, '**', 'bold text'));
    expect(result.text).toBe('a **wise** word here');
    expect(result.selected).toBe('wise');
  });

  it('inserts a selected placeholder when nothing is selected', () => {
    const result = run('ab', wrapInline('ab', 1, 1, '*', 'italic text'));
    expect(result.text).toBe('a*italic text*b');
    expect(result.selected).toBe('italic text');
  });

  it('keeps the spaces at the edges of the selection outside the markers', () => {
    // Double-click on Windows selects the word plus its trailing space.
    const result = run('say wise words', wrapInline('say wise words', 4, 9, '**', 'bold text'));
    expect(result.text).toBe('say **wise** words');
    expect(result.selected).toBe('wise');
  });
});

describe('formatLines', () => {
  it('turns the cursor line into a heading and leaves the caret at its end', () => {
    const text = 'intro\nThe title\noutro';
    const edit = formatLines(text, 8, 8, 'h2');
    expect(applyEdit(text, edit)).toBe('intro\n## The title\noutro');
    expect(edit.selectStart).toBe(edit.selectEnd);
    expect(edit.selectEnd).toBe('intro\n## The title'.length);
  });

  it('removes the marker when the line already has it, and switches between heading levels', () => {
    expect(applyEdit('## Title', formatLines('## Title', 0, 0, 'h2'))).toBe('Title');
    expect(applyEdit('## Title', formatLines('## Title', 0, 0, 'h3'))).toBe('### Title');
    expect(applyEdit('### Title', formatLines('### Title', 0, 0, 'h2'))).toBe('## Title');
    expect(applyEdit('- item', formatLines('- item', 0, 0, 'quote'))).toBe('> item');
  });

  it('makes a marker on an empty line and keeps the caret after it', () => {
    const edit = formatLines('', 0, 0, 'h3');
    expect(edit.insert).toBe('### ');
    expect(edit.selectStart).toBe(4);
    expect(edit.selectEnd).toBe(4);
  });

  it('formats every selected line, numbers lists and skips blank lines', () => {
    const text = 'one\ntwo\n\nthree';
    expect(applyEdit(text, formatLines(text, 0, text.length, 'ul'))).toBe('- one\n- two\n\n- three');
    expect(applyEdit(text, formatLines(text, 0, text.length, 'ol'))).toBe('1. one\n2. two\n\n3. three');
    expect(applyEdit(text, formatLines(text, 0, text.length, 'quote'))).toBe('> one\n> two\n\n> three');
  });

  it('toggles a whole selected list off again', () => {
    const text = '- one\n- two';
    expect(applyEdit(text, formatLines(text, 0, text.length, 'ul'))).toBe('one\ntwo');
  });

  it('does not touch the next line when the selection ends at its start', () => {
    const text = 'one\ntwo\nthree';
    // Selection covers "one\n" and stops right before "two".
    expect(applyEdit(text, formatLines(text, 0, 4, 'ul'))).toBe('- one\ntwo\nthree');
  });

  it('handles a first line that is empty', () => {
    const text = '\nsecond';
    expect(applyEdit(text, formatLines(text, 0, 0, 'h2'))).toBe('## \nsecond');
  });
});

describe('insertDivider and insertImage', () => {
  it('splits a paragraph around the block with one blank line on each side and no stray spaces', () => {
    const text = 'before after';
    expect(run(text, insertDivider(text, 6)).text).toBe('before\n\n---\n\nafter');
    expect(run(text, insertDivider(text, 7)).text).toBe('before\n\n---\n\nafter');
    expect(run('mid-word', insertDivider('mid-word', 3)).text).toBe('mid\n\n---\n\n-word');
  });

  it('normalises the blank lines that were already there', () => {
    const text = 'first\n\n\n\nsecond';
    const edit = insertDivider(text, 7);
    expect(applyEdit(text, edit)).toBe('first\n\n---\n\nsecond');
  });

  it('works at the start and the end of the text', () => {
    expect(applyEdit('body', insertDivider('body', 0))).toBe('---\n\nbody');
    const atEnd = insertDivider('body', 4);
    expect(applyEdit('body', atEnd)).toBe('body\n\n---\n\n');
    expect(atEnd.selectStart).toBe('body\n\n---\n\n'.length);
  });

  it('inserts an image on its own paragraph with a cleaned alt text', () => {
    const text = 'Intro text';
    const result = run(text, insertImage(text, 10, 10, 'https://cdn.test/a.jpg', 'A [temple]\nat dawn '));
    expect(result.text).toBe('Intro text\n\n![A temple at dawn](https://cdn.test/a.jpg)\n\n');
  });
});

describe('insertLink', () => {
  it('links the selected text and puts the caret after the link', () => {
    const text = 'visit our courses today';
    const edit = insertLink(text, 10, 17, 'https://example.com/courses');
    expect(applyEdit(text, edit)).toBe('visit our [courses](https://example.com/courses) today');
    expect(edit.selectStart).toBe(edit.selectEnd);
  });

  it('keeps the spaces around a selection outside the link', () => {
    const text = 'visit courses now';
    expect(applyEdit(text, insertLink(text, 5, 14, 'https://x.test'))).toBe('visit [courses](https://x.test) now');
  });

  it('inserts selected placeholder text when nothing is selected', () => {
    const result = run('ab', insertLink('ab', 1, 1, 'https://x.test'));
    expect(result.text).toBe('a[link text](https://x.test)b');
    expect(result.selected).toBe('link text');
  });

  it('removes brackets from the label so the link cannot end early', () => {
    const text = 'a [b] c';
    expect(applyEdit(text, insertLink(text, 2, 5, 'https://x.test'))).toBe('a [b](https://x.test) c');
  });
});

describe('normalizeUrl', () => {
  it('accepts web, mail, phone, site-relative and anchor addresses', () => {
    expect(normalizeUrl('https://example.com/a?b=1')).toBe('https://example.com/a?b=1');
    expect(normalizeUrl(' http://example.com ')).toBe('http://example.com');
    expect(normalizeUrl('mailto:hi@example.com')).toBe('mailto:hi@example.com');
    expect(normalizeUrl('tel:+911234567890')).toBe('tel:+911234567890');
    expect(normalizeUrl('/courses')).toBe('/courses');
    expect(normalizeUrl('#top')).toBe('#top');
  });

  it('adds https:// or mailto: to addresses typed without a scheme', () => {
    expect(normalizeUrl('example.com/page')).toBe('https://example.com/page');
    expect(normalizeUrl('www.example.com')).toBe('https://www.example.com');
    expect(normalizeUrl('hello@example.com')).toBe('mailto:hello@example.com');
  });

  it('refuses empty input, plain words and schemes that can run script', () => {
    expect(normalizeUrl('')).toBeNull();
    expect(normalizeUrl('   ')).toBeNull();
    expect(normalizeUrl('about')).toBeNull();
    expect(normalizeUrl('javascript:alert(1)')).toBeNull();
    expect(normalizeUrl('data:text/html;base64,AAAA')).toBeNull();
    expect(normalizeUrl('mailto:hi@example.com', IMAGE_SCHEMES)).toBeNull();
  });

  it('encodes spaces and parentheses so the Markdown link cannot break', () => {
    expect(normalizeUrl('https://example.com/a b(1)')).toBe('https://example.com/a%20b%281%29');
  });
});
