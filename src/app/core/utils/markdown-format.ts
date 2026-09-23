// Text edits behind the admin editor's formatting toolbar. Every function is pure: it takes the current text and
// the selection and returns the replacement for one range plus where the selection should end up. The component
// applies that as a single edit, which keeps the browser's undo history working where it can.

export interface TextEdit {
  /** Start of the replaced range, in the text before the edit. */
  from: number;
  /** End of the replaced range, in the text before the edit. */
  to: number;
  insert: string;
  /** Selection after the edit, in the text after the edit. */
  selectStart: number;
  selectEnd: number;
}

export type LineFormat = 'h2' | 'h3' | 'ul' | 'ol' | 'quote';

export const applyEdit = (text: string, edit: TextEdit): string =>
  text.slice(0, edit.from) + edit.insert + text.slice(edit.to);

// Emphasis does not work next to a space ("** bold **"), and a double-click on Windows selects the trailing
// space, so whitespace at the edges of the selection stays outside the markers.
const splitEdges = (selected: string): { lead: string; core: string; trail: string } => {
  const core = selected.trim();
  if (!core) {
    return { lead: selected, core: '', trail: '' };
  }
  return { lead: /^\s*/.exec(selected)![0], core, trail: /\s*$/.exec(selected)![0] };
};

export function wrapInline(text: string, start: number, end: number, marker: string, placeholder: string): TextEdit {
  const { lead, core, trail } = splitEdges(text.slice(start, end));
  const word = core || placeholder;
  const selectStart = start + lead.length + marker.length;
  return {
    from: start,
    to: end,
    insert: `${lead}${marker}${word}${marker}${trail}`,
    selectStart,
    selectEnd: selectStart + word.length,
  };
}

const LINE_MARKERS: Record<LineFormat, RegExp> = {
  h2: /^##(?!#)[ \t]/,
  h3: /^###(?!#)[ \t]/,
  ul: /^[-*+][ \t]/,
  ol: /^\d+[.)][ \t]/,
  quote: /^>/,
};
const ANY_LINE_MARKER = /^(?:#{1,6}[ \t]+|[-*+][ \t]+|\d+[.)][ \t]+|>[ \t]?)/;

const markerFor = (format: LineFormat, position: number): string => {
  switch (format) {
    case 'h2':
      return '## ';
    case 'h3':
      return '### ';
    case 'ul':
      return '- ';
    case 'ol':
      return `${position}. `;
    case 'quote':
      return '> ';
  }
};

// Applies a heading, list or quote marker to every line the selection touches. Lines that already carry the
// marker lose it again (a toggle), and lines with a different marker are switched over.
export function formatLines(text: string, start: number, end: number, format: LineFormat): TextEdit {
  const lineStart = start === 0 ? 0 : text.lastIndexOf('\n', start - 1) + 1;
  // A selection that ends at the very start of a line does not include that line.
  const lastChar = end > start && text[end - 1] === '\n' ? end - 1 : end;
  const nextBreak = text.indexOf('\n', lastChar);
  const lineEnd = nextBreak === -1 ? text.length : nextBreak;

  const lines = text.slice(lineStart, lineEnd).split('\n');
  const single = lines.length === 1;
  const targets = lines.filter((line) => single || line.trim() !== '');
  const alreadyApplied = targets.length > 0 && targets.every((line) => LINE_MARKERS[format].test(line));

  let position = 0;
  const insert = lines
    .map((line) => {
      if (!single && line.trim() === '') {
        return line;
      }
      const bare = line.replace(ANY_LINE_MARKER, '');
      if (alreadyApplied) {
        return bare;
      }
      position += 1;
      return `${markerFor(format, position)}${bare}`;
    })
    .join('\n');

  // One line: leave the caret at its end so typing continues after the marker. Several: keep them selected.
  const selectStart = single ? lineStart + insert.length : lineStart;
  return { from: lineStart, to: lineEnd, insert, selectStart, selectEnd: lineStart + insert.length };
}

// Puts a block (an image, a divider) on its own paragraph with exactly one blank line on each side. Spaces and
// line breaks around the insertion point are absorbed, so splitting "one | two" leaves no stray space behind.
export function insertBlock(text: string, start: number, end: number, block: string): TextEdit {
  const spaceBefore = /[ \t\n]*$/.exec(text.slice(0, start))![0].length;
  const spaceAfter = /^[ \t\n]*/.exec(text.slice(end))![0].length;
  const from = start - spaceBefore;
  const to = end + spaceAfter;
  const insert = `${from === 0 ? '' : '\n\n'}${block}\n\n`;
  const caret = from + insert.length;
  return { from, to, insert, selectStart: caret, selectEnd: caret };
}

const escapeUrl = (url: string): string => url.replace(/\s/g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');

const LINK_SCHEMES = ['http', 'https', 'mailto', 'tel'];
export const IMAGE_SCHEMES = ['http', 'https'];

// A URL that is safe to write into a Markdown link or image, or null when it is empty or its scheme is not
// allowed. An address typed without a scheme ("example.com/page") gets https://.
export function normalizeUrl(raw: string, schemes: readonly string[] = LINK_SCHEMES): string | null {
  const value = raw.trim();
  if (!value) {
    return null;
  }
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(value)?.[1].toLowerCase();
  if (scheme) {
    return schemes.includes(scheme) ? escapeUrl(value) : null;
  }
  if (/^[/#]/.test(value)) {
    return escapeUrl(value);
  }
  if (schemes.includes('mailto') && /^[^\s@/]+@[^\s@/]+\.[a-z]{2,}$/i.test(value)) {
    return `mailto:${value}`;
  }
  return /^[^\s/?#@]+\.[a-z]{2,}(?:[/?#]\S*)?$/i.test(value) ? `https://${escapeUrl(value)}` : null;
}

export function insertLink(text: string, start: number, end: number, url: string): TextEdit {
  const { lead, core, trail } = splitEdges(text.slice(start, end));
  const label = (core || 'link text').replace(/[[\]]/g, '');
  const insert = `${lead}[${label}](${url})${trail}`;
  if (core) {
    const caret = start + insert.length;
    return { from: start, to: end, insert, selectStart: caret, selectEnd: caret };
  }
  // Nothing was selected: leave the placeholder text selected so typing replaces it.
  const labelStart = start + lead.length + 1;
  return { from: start, to: end, insert, selectStart: labelStart, selectEnd: labelStart + label.length };
}

export function insertImage(text: string, start: number, end: number, url: string, alt: string): TextEdit {
  const cleanAlt = alt.replace(/[[\]]/g, '').replace(/\s+/g, ' ').trim();
  return insertBlock(text, start, end, `![${cleanAlt}](${url})`);
}

export const insertDivider = (text: string, position: number): TextEdit => insertBlock(text, position, position, '---');
