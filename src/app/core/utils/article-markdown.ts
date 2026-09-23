import { Marked, type Tokens } from 'marked';

// Article bodies are written as Markdown in the admin editor and stored as-is in the API's `content` field.
// This is the one place that turns that text into HTML, for the public reader and the admin preview alike.
// Angular sanitizes the result again when it is bound with [innerHTML]; the rules below keep the markup
// predictable and are not meant to be the only line of defence.

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Browsers ignore whitespace and control characters inside a URL scheme ("java<TAB>script:" still runs),
// so they are stripped before the scheme is read and cannot be used to hide one.
const CONTROL_OR_SPACE = /[\u0000- \u007f-\u009f]/g;
const SCHEME = /^([a-z][a-z0-9+.-]*):/i;

const schemeOf = (href: string): string | null => SCHEME.exec(href.replace(CONTROL_OR_SPACE, ''))?.[1].toLowerCase() ?? null;

const LINK_SCHEMES = new Set(['http', 'https', 'mailto', 'tel']);
const IMAGE_SCHEMES = new Set(['http', 'https']);

// An attribute-safe URL, or null when its scheme is not allowed. Relative URLs have no scheme and pass.
const safeUrl = (href: string, allowed: Set<string>): string | null => {
  const scheme = schemeOf(href);
  if (scheme !== null && !allowed.has(scheme)) {
    return null;
  }
  try {
    // Encode the way marked does: keep existing %xx escapes, encode everything else that needs it.
    return escapeHtml(encodeURI(href.trim()).replace(/%25/g, '%'));
  } catch {
    return null;
  }
};

const markdown = new Marked(
  { gfm: true, breaks: true },
  {
    renderer: {
      // Raw HTML typed into the source is shown as text and never rendered.
      html({ text, block }: Tokens.HTML | Tokens.Tag) {
        return block ? `<p>${escapeHtml(text)}</p>` : escapeHtml(text);
      },
      // The article title is the reader's h2, so headings in the body start one level below it.
      heading({ tokens, depth }: Tokens.Heading) {
        const level = Math.min(depth + 1, 6);
        return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const label = this.parser.parseInline(tokens);
        const url = safeUrl(href, LINK_SCHEMES);
        if (url === null) {
          return label;
        }
        const scheme = schemeOf(href);
        const external = scheme === 'http' || scheme === 'https';
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
        const targetAttr = external ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${url}"${titleAttr}${targetAttr}>${label}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const alt = escapeHtml(text);
        const src = safeUrl(href, IMAGE_SCHEMES);
        if (src === null) {
          return alt;
        }
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
        return `<img src="${src}" alt="${alt}"${titleAttr} loading="lazy">`;
      },
    },
  },
);

// Articles saved before formatting existed are plain text with one paragraph per line, and the old reader showed
// each line as its own paragraph. Text with no blank line and no Markdown block syntax (heading, list, quote,
// code fence, rule, table) is treated the same way; anything else follows normal Markdown rules.
const BLANK_LINE = /\n[ \t]*\n/;
const BLOCK_SYNTAX = /^ {0,3}(#{1,6}[ \t]|[-*+][ \t]|\d+[.)][ \t]|>|`{3}|~{3}|[-*_=]{3,}[ \t]*$|\|)/m;

const asParagraphPerLine = (text: string): string =>
  BLANK_LINE.test(text) || BLOCK_SYNTAX.test(text)
    ? text
    : text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join('\n\n');

export function renderArticleMarkdown(source: string | null | undefined): string {
  if (!source?.trim()) {
    return '';
  }
  const text = source.replace(/\r\n?/g, '\n');
  return markdown.parse(asParagraphPerLine(text), { async: false });
}
