import type { JSONContent } from '@tiptap/react';

/**
 * TypstSerializer: Converts TipTap JSON document to Typst markup.
 * This is the core of ladoc - the bridge between visual editing and Typst output.
 *
 * Follows the prosemirror-markdown serializer pattern:
 * - A map of node types → serialization functions
 * - A map of mark types → open/close delimiters
 */

interface SerializerOptions {
  preamble?: string;
  pageSettings?: {
    pageSize?: string;
    orientation?: string;
    margins?: {
      top: string;
      bottom: string;
      left: string;
      right: string;
    };
  };
  fontFamily?: string;
  fontSize?: string;
}

/**
 * Maps CSS font-family names to Typst-compatible font names.
 * The Typst WASM compiler loads these fonts from Google Fonts.
 * Generic families (serif/sans-serif/monospace) are handled natively by Typst.
 */
const FONT_MAP: Record<string, string> = {
  // Generic families — only fonts actually loaded by the worker are used
  'serif': 'Noto Serif',             // Loaded from CDN in worker
  'sans-serif': 'Noto Sans',         // Loaded from CDN in worker
  'monospace': 'DejaVu Sans Mono',   // Built-in to Typst WASM
  // Specific fonts — mapped to available alternatives
  'Georgia': 'Noto Serif',
  'Times New Roman': 'Noto Serif',
  'Arial': 'Noto Sans',
  'Verdana': 'Noto Sans',
};

export function mapFontToTypst(cssFont: string): string {
  return FONT_MAP[cssFont] || cssFont;
}

interface MarkDelimiter {
  open: string | ((attrs: Record<string, unknown>) => string);
  close: string | ((attrs: Record<string, unknown>) => string);
}

const MARK_SERIALIZERS: Record<string, MarkDelimiter> = {
  bold: { open: '*', close: '*' },
  italic: { open: '_', close: '_' },
  strike: { open: '#strike[', close: ']' },
  underline: { open: '#underline[', close: ']' },
  code: { open: '`', close: '`' },
  link: {
    open: (attrs) => `#link("${attrs.href || ''}")[`,
    close: ']',
  },
  highlight: {
    open: (attrs) => {
      const color = attrs.color as string | undefined;
      return color ? `#highlight(fill: rgb("${color}"))[` : '#highlight[';
    },
    close: ']',
  },
  textStyle: {
    open: (attrs) => {
      const parts: string[] = [];
      if (attrs.color) parts.push(`fill: rgb("${attrs.color}")`);
      if (attrs.fontSize) parts.push(`size: ${attrs.fontSize}`);
      if (attrs.fontFamily) {
        const typstFont = mapFontToTypst(attrs.fontFamily as string);
        parts.push(`font: "${typstFont}"`);
      }
      if (parts.length === 0) return '';
      return `#text(${parts.join(', ')})[`;
    },
    close: (attrs) => {
      const hasAttrs =
        attrs.color || attrs.fontSize || attrs.fontFamily;
      return hasAttrs ? ']' : '';
    },
  },
};

function serializeMarks(
  text: string,
  marks: Array<{ type: string; attrs?: Record<string, unknown> }>
): string {
  if (!marks || marks.length === 0) return escapeTypst(text);

  let result = escapeTypst(text);

  // Apply marks from innermost to outermost
  for (let i = marks.length - 1; i >= 0; i--) {
    const mark = marks[i];
    const serializer = MARK_SERIALIZERS[mark.type];
    if (!serializer) continue;

    const attrs = mark.attrs || {};
    const open =
      typeof serializer.open === 'function'
        ? serializer.open(attrs)
        : serializer.open;
    const close =
      typeof serializer.close === 'function'
        ? serializer.close(attrs)
        : serializer.close;

    if (open) {
      result = `${open}${result}${close}`;
    }
  }

  return result;
}

function escapeTypst(text: string): string {
  // Escape special Typst characters that could be misinterpreted
  // We only escape if they're not already inside a markup context
  return text
    .replace(/\\/g, '\\\\')
    .replace(/@/g, '\\@')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#');
}

function serializeInlineContent(node: JSONContent): string {
  if (!node.content) return '';

  return node.content
    .map((child) => {
      if (child.type === 'text') {
        return serializeMarks(child.text || '', child.marks || []);
      }
      if (child.type === 'hardBreak') {
        return ' \\\n';
      }
      if (child.type === 'image') {
        return serializeImage(child);
      }
      if (child.type === 'mathInline') {
        const formula = (child.attrs?.formula as string) || '';
        const display = child.attrs?.display;
        return display ? `$ ${formula} $` : `$${formula}$`;
      }
      if (child.type === 'footnote') {
        const content = (child.attrs?.content as string) || '';
        return `#footnote[${content}]`;
      }
      if (child.type === 'citation') {
        const citeKey = (child.attrs?.citeKey as string) || '';
        const label = (child.attrs?.label as string) || citeKey;
        // Render as plain bracketed label — no bibliography file is loaded,
        // so Typst's @key syntax would error with "label does not exist".
        return `\\[${escapeTypst(label)}\\]`;
      }
      return '';
    })
    .join('');
}

function serializeImage(node: JSONContent): string {
  const src = (node.attrs?.src as string) || '';
  const width = node.attrs?.width as string | undefined;
  const alt = (node.attrs?.alt as string) || '';

  const params: string[] = [`"${src}"`];
  if (width) params.push(`width: ${width}`);
  if (alt) params.push(`alt: "${alt}"`);

  return `#image(${params.join(', ')})`;
}

function serializeHeading(node: JSONContent): string {
  const level = (node.attrs?.level as number) || 1;
  const prefix = '='.repeat(level);
  const content = serializeInlineContent(node);
  return `${prefix} ${content}\n\n`;
}

function serializeParagraph(node: JSONContent): string {
  const content = serializeInlineContent(node);
  if (!content) return '\n';

  const textAlign = node.attrs?.textAlign as string | undefined;
  if (textAlign === 'justify') {
    return `#par(justify: true)[${content}]\n\n`;
  }
  if (textAlign && textAlign !== 'left') {
    return `#align(${textAlign})[${content}]\n\n`;
  }

  return `${content}\n\n`;
}

function serializeBulletList(node: JSONContent): string {
  if (!node.content) return '';

  return (
    node.content
      .map((listItem) => {
        const content = listItem.content
          ?.map((child) => {
            if (child.type === 'paragraph') {
              return serializeInlineContent(child);
            }
            if (child.type === 'bulletList') {
              // Nested list - indent
              return serializeBulletList(child)
                .split('\n')
                .map((line) => (line.trim() ? `  ${line}` : ''))
                .join('\n');
            }
            if (child.type === 'orderedList') {
              return serializeOrderedList(child)
                .split('\n')
                .map((line) => (line.trim() ? `  ${line}` : ''))
                .join('\n');
            }
            return '';
          })
          .join('\n');
        return `- ${content}`;
      })
      .join('\n') + '\n\n'
  );
}

function serializeOrderedList(node: JSONContent): string {
  if (!node.content) return '';

  return (
    node.content
      .map((listItem) => {
        const content = listItem.content
          ?.map((child) => {
            if (child.type === 'paragraph') {
              return serializeInlineContent(child);
            }
            if (child.type === 'bulletList') {
              return serializeBulletList(child)
                .split('\n')
                .map((line) => (line.trim() ? `  ${line}` : ''))
                .join('\n');
            }
            if (child.type === 'orderedList') {
              return serializeOrderedList(child)
                .split('\n')
                .map((line) => (line.trim() ? `  ${line}` : ''))
                .join('\n');
            }
            return '';
          })
          .join('\n');
        return `+ ${content}`;
      })
      .join('\n') + '\n\n'
  );
}

function serializeTable(node: JSONContent): string {
  if (!node.content) return '';

  const rows = node.content;
  const colCount = rows[0]?.content?.length || 0;

  let result = `#table(\n  columns: ${colCount},\n`;

  for (const row of rows) {
    if (!row.content) continue;
    for (const cell of row.content) {
      const content = cell.content
        ?.map((child) => {
          if (child.type === 'paragraph') {
            return serializeInlineContent(child);
          }
          return '';
        })
        .join(' ');
      result += `  [${content || ''}],\n`;
    }
  }

  result += ')\n\n';
  return result;
}

function serializeCodeBlock(node: JSONContent): string {
  const lang = (node.attrs?.language as string) || '';
  const content = node.content?.[0]?.text || '';
  return '```' + lang + '\n' + content + '\n```\n\n';
}

function serializeBlockquote(node: JSONContent): string {
  const content = node.content
    ?.map((child) => serializeNode(child))
    .join('')
    .trim();
  return `#quote[${content}]\n\n`;
}

function serializeTaskList(node: JSONContent): string {
  if (!node.content) return '';

  return (
    node.content
      .map((taskItem) => {
        const checked = taskItem.attrs?.checked ? true : false;
        const checkbox = checked ? '[x]' : '[ ]';
        const content = taskItem.content
          ?.map((child) => {
            if (child.type === 'paragraph') {
              return serializeInlineContent(child);
            }
            return '';
          })
          .join(' ');
        return `- ${checkbox} ${content}`;
      })
      .join('\n') + '\n\n'
  );
}

function serializeNode(node: JSONContent): string {
  switch (node.type) {
    case 'doc':
      return (node.content || []).map(serializeNode).join('');
    case 'heading':
      return serializeHeading(node);
    case 'paragraph':
      return serializeParagraph(node);
    case 'bulletList':
      return serializeBulletList(node);
    case 'orderedList':
      return serializeOrderedList(node);
    case 'listItem':
      // Handled by list serializers
      return '';
    case 'table':
      return serializeTable(node);
    case 'tableRow':
    case 'tableCell':
    case 'tableHeader':
      // Handled by table serializer
      return '';
    case 'codeBlock':
      return serializeCodeBlock(node);
    case 'blockquote':
      return serializeBlockquote(node);
    case 'image':
      return serializeImage(node) + '\n\n';
    case 'taskList':
      return serializeTaskList(node);
    case 'taskItem':
      return '';
    case 'pageBreak':
      return '#pagebreak()\n\n';
    case 'horizontalRule':
      return '#line(length: 100%)\n\n';
    case 'hardBreak':
      return ' \\\n';
    case 'mathBlock': {
      const formula = (node.attrs?.formula as string) || '';
      return `$ ${formula} $\n\n`;
    }
    case 'tableOfContents':
      return '#outline()\n\n';
    default:
      // Unknown node type - try to serialize children
      if (node.content) {
        return node.content.map(serializeNode).join('');
      }
      return '';
  }
}

function generatePreamble(options: SerializerOptions): string {
  const lines: string[] = [];

  // Custom preamble first
  if (options.preamble) {
    lines.push(options.preamble);
  }

  // Page settings
  if (options.pageSettings) {
    const ps = options.pageSettings;
    const params: string[] = [];

    if (ps.pageSize) params.push(`paper: "${ps.pageSize}"`);
    if (ps.orientation === 'landscape') params.push('flipped: true');
    if (ps.margins) {
      params.push(`margin: (top: ${ps.margins.top}, bottom: ${ps.margins.bottom}, left: ${ps.margins.left}, right: ${ps.margins.right})`);
    }

    if (params.length > 0) {
      lines.push(`#set page(${params.join(', ')})`);
    }
  }

  // Font settings
  if (options.fontFamily) {
    const typstFont = mapFontToTypst(options.fontFamily);
    lines.push(`#set text(font: "${typstFont}")`);
  }
  if (options.fontSize) {
    lines.push(`#set text(size: ${options.fontSize})`);
  }

  if (lines.length > 0) {
    return lines.join('\n') + '\n\n';
  }
  return '';
}

export function serialize(
  doc: JSONContent,
  options: SerializerOptions = {}
): string {
  const preamble = generatePreamble(options);
  const body = serializeNode(doc);

  return preamble + body;
}

export function getPlainText(doc: JSONContent): string {
  if (!doc.content) return '';

  return doc.content
    .map((node) => {
      if (node.type === 'text') return node.text || '';
      if (node.content) return getPlainText(node);
      return '';
    })
    .join('\n');
}

export function countWords(doc: JSONContent): number {
  const text = extractText(doc);
  return text
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function countCharacters(doc: JSONContent): number {
  return extractText(doc).length;
}

function extractText(node: JSONContent): string {
  if (node.type === 'text') return node.text || '';
  if (!node.content) return '';
  return node.content.map(extractText).join(
    node.type === 'paragraph' || node.type === 'heading' ? ' ' : ''
  );
}

function unescapeTypst(text: string): string {
  return text
    .replace(/\\#/g, '#')
    .replace(/\\\$/g, '$')
    .replace(/\\@/g, '@')
    .replace(/\\\\/g, '\\');
}

/**
 * Find the matching closing bracket for a bracket at startIdx.
 * Handles nested brackets: #text(...)[...#footnote[inner]...]
 */
function findClosingBracket(str: string, startIdx: number, open = '[', close = ']'): number {
  let depth = 1;
  for (let j = startIdx + 1; j < str.length; j++) {
    if (str[j] === '\\') { j++; continue; }
    if (str[j] === open) depth++;
    if (str[j] === close) { depth--; if (depth === 0) return j; }
  }
  return -1;
}

function findClosingParen(str: string, startIdx: number): number {
  return findClosingBracket(str, startIdx, '(', ')');
}

/**
 * Parse Typst #text(params)[content] — extract attrs and inner text.
 */
function parseTextFunc(paramsStr: string): Record<string, unknown> {
  const attrs: Record<string, unknown> = {};
  // font: "..."
  const fontMatch = paramsStr.match(/font:\s*"([^"]+)"/);
  if (fontMatch) attrs.fontFamily = fontMatch[1];
  // size: ...
  const sizeMatch = paramsStr.match(/size:\s*(\S+)/);
  if (sizeMatch) attrs.fontSize = sizeMatch[1].replace(/,\s*$/, '');
  // fill: rgb("...")
  const fillMatch = paramsStr.match(/fill:\s*rgb\("([^"]+)"\)/);
  if (fillMatch) attrs.color = fillMatch[1];
  return attrs;
}

/**
 * Enhanced inline parser.
 * Handles: *bold*, _italic_, `code`, #text(...)[...], #underline[...], #strike[...],
 * #highlight[...], #link("...")[...], #footnote[...], @citeKey, $math$, $ display math $
 */
function parseInlineTypst(text: string): JSONContent[] {
  if (!text) return [{ type: 'text', text: '' }];

  const result: JSONContent[] = [];
  let pos = 0;

  function pushPlain(s: string) {
    if (s) result.push({ type: 'text', text: unescapeTypst(s) });
  }

  while (pos < text.length) {
    // --- #text(params)[content] — font, size, color ---
    if (text.startsWith('#text(', pos)) {
      const parenStart = pos + 5; // index of '('
      const parenEnd = findClosingParen(text, parenStart);
      if (parenEnd !== -1 && text[parenEnd + 1] === '[') {
        const bracketEnd = findClosingBracket(text, parenEnd + 1);
        if (bracketEnd !== -1) {
          const paramsStr = text.slice(parenStart + 1, parenEnd);
          const innerText = text.slice(parenEnd + 2, bracketEnd);
          const attrs = parseTextFunc(paramsStr);
          const innerNodes = parseInlineTypst(innerText);
          // Apply textStyle mark to all inner text nodes
          for (const node of innerNodes) {
            if (node.type === 'text') {
              const existingMarks = node.marks || [];
              node.marks = [...existingMarks, { type: 'textStyle', attrs }];
            }
          }
          result.push(...innerNodes);
          pos = bracketEnd + 1;
          continue;
        }
      }
    }

    // --- #underline[content] ---
    if (text.startsWith('#underline[', pos)) {
      const bracketStart = pos + 10;
      const bracketEnd = findClosingBracket(text, bracketStart);
      if (bracketEnd !== -1) {
        const inner = text.slice(bracketStart + 1, bracketEnd);
        const innerNodes = parseInlineTypst(inner);
        for (const node of innerNodes) {
          if (node.type === 'text') {
            node.marks = [...(node.marks || []), { type: 'underline' }];
          }
        }
        result.push(...innerNodes);
        pos = bracketEnd + 1;
        continue;
      }
    }

    // --- #strike[content] ---
    if (text.startsWith('#strike[', pos)) {
      const bracketStart = pos + 7;
      const bracketEnd = findClosingBracket(text, bracketStart);
      if (bracketEnd !== -1) {
        const inner = text.slice(bracketStart + 1, bracketEnd);
        const innerNodes = parseInlineTypst(inner);
        for (const node of innerNodes) {
          if (node.type === 'text') {
            node.marks = [...(node.marks || []), { type: 'strike' }];
          }
        }
        result.push(...innerNodes);
        pos = bracketEnd + 1;
        continue;
      }
    }

    // --- #highlight[content] or #highlight(fill: rgb("..."))[content] ---
    if (text.startsWith('#highlight', pos)) {
      const afterHighlight = pos + 10;
      let highlightAttrs: Record<string, unknown> = {};
      let bracketStart: number;

      if (text[afterHighlight] === '(') {
        const parenEnd = findClosingParen(text, afterHighlight);
        if (parenEnd !== -1 && text[parenEnd + 1] === '[') {
          const colorMatch = text.slice(afterHighlight + 1, parenEnd).match(/fill:\s*rgb\("([^"]+)"\)/);
          if (colorMatch) highlightAttrs = { color: colorMatch[1] };
          bracketStart = parenEnd + 1;
        } else {
          pushPlain(text[pos]);
          pos++;
          continue;
        }
      } else if (text[afterHighlight] === '[') {
        bracketStart = afterHighlight;
      } else {
        pushPlain(text[pos]);
        pos++;
        continue;
      }

      const bracketEnd = findClosingBracket(text, bracketStart);
      if (bracketEnd !== -1) {
        const inner = text.slice(bracketStart + 1, bracketEnd);
        const innerNodes = parseInlineTypst(inner);
        for (const node of innerNodes) {
          if (node.type === 'text') {
            node.marks = [...(node.marks || []), { type: 'highlight', attrs: highlightAttrs }];
          }
        }
        result.push(...innerNodes);
        pos = bracketEnd + 1;
        continue;
      }
    }

    // --- #link("url")[label] ---
    if (text.startsWith('#link("', pos)) {
      const urlStart = pos + 7;
      const urlEnd = text.indexOf('")', urlStart);
      if (urlEnd !== -1 && text[urlEnd + 2] === '[') {
        const bracketEnd = findClosingBracket(text, urlEnd + 2);
        if (bracketEnd !== -1) {
          const href = text.slice(urlStart, urlEnd);
          const inner = text.slice(urlEnd + 3, bracketEnd);
          const innerNodes = parseInlineTypst(inner);
          for (const node of innerNodes) {
            if (node.type === 'text') {
              node.marks = [...(node.marks || []), { type: 'link', attrs: { href } }];
            }
          }
          result.push(...innerNodes);
          pos = bracketEnd + 1;
          continue;
        }
      }
    }

    // --- #footnote[content] ---
    if (text.startsWith('#footnote[', pos)) {
      const bracketStart = pos + 9;
      const bracketEnd = findClosingBracket(text, bracketStart);
      if (bracketEnd !== -1) {
        const content = text.slice(bracketStart + 1, bracketEnd);
        result.push({ type: 'footnote', attrs: { content } });
        pos = bracketEnd + 1;
        continue;
      }
    }

    // --- @citeKey (citation) ---
    if (text[pos] === '@' && pos > 0 ? /\s/.test(text[pos - 1]) : true) {
      const citeMatch = text.slice(pos).match(/^@([a-zA-Z][\w-]*\d*)/);
      if (citeMatch) {
        const citeKey = citeMatch[1];
        const label = citeKey.replace(/(\d+)$/, ' $1');
        result.push({ type: 'citation', attrs: { citeKey, label } });
        pos += citeMatch[0].length;
        continue;
      }
    }

    // --- $formula$ (inline math) or $ formula $ (display math) ---
    if (text[pos] === '$') {
      // Display math: $ ... $ (with spaces)
      if (text[pos + 1] === ' ') {
        const endIdx = text.indexOf(' $', pos + 2);
        if (endIdx !== -1) {
          const formula = text.slice(pos + 2, endIdx);
          result.push({ type: 'mathInline', attrs: { formula, display: true } });
          pos = endIdx + 2;
          continue;
        }
      }
      // Inline math: $...$
      const endIdx = text.indexOf('$', pos + 1);
      if (endIdx !== -1) {
        const formula = text.slice(pos + 1, endIdx);
        result.push({ type: 'mathInline', attrs: { formula, display: false } });
        pos = endIdx + 1;
        continue;
      }
    }

    // --- *bold* ---
    if (text[pos] === '*') {
      const endIdx = text.indexOf('*', pos + 1);
      if (endIdx !== -1) {
        const inner = text.slice(pos + 1, endIdx);
        const innerNodes = parseInlineTypst(inner);
        for (const node of innerNodes) {
          if (node.type === 'text') {
            node.marks = [...(node.marks || []), { type: 'bold' }];
          }
        }
        result.push(...innerNodes);
        pos = endIdx + 1;
        continue;
      }
    }

    // --- _italic_ ---
    if (text[pos] === '_') {
      const endIdx = text.indexOf('_', pos + 1);
      if (endIdx !== -1) {
        const inner = text.slice(pos + 1, endIdx);
        const innerNodes = parseInlineTypst(inner);
        for (const node of innerNodes) {
          if (node.type === 'text') {
            node.marks = [...(node.marks || []), { type: 'italic' }];
          }
        }
        result.push(...innerNodes);
        pos = endIdx + 1;
        continue;
      }
    }

    // --- `code` ---
    if (text[pos] === '`') {
      const endIdx = text.indexOf('`', pos + 1);
      if (endIdx !== -1) {
        const code = text.slice(pos + 1, endIdx);
        result.push({ type: 'text', text: code, marks: [{ type: 'code' }] });
        pos = endIdx + 1;
        continue;
      }
    }

    // --- Plain character ---
    // Collect plain text until a special character
    let end = pos + 1;
    while (end < text.length && !'*_`$@#'.includes(text[end])) {
      if (text[end] === '\\') { end += 2; continue; }
      end++;
    }
    pushPlain(text.slice(pos, end));
    pos = end;
  }

  return result.length > 0 ? result : [{ type: 'text', text: unescapeTypst(text) }];
}

/**
 * Best-effort Typst → TipTap JSON parser.
 * Handles: headings, paragraphs, bullet/ordered/task lists, code blocks, horizontal rules,
 * page breaks, block quotes, tables, math blocks, TOC, images,
 * inline: bold, italic, code, underline, strike, highlight, link, textStyle,
 * footnotes, citations, inline/display math.
 * Preamble lines (#set, #let, #show, #import) are parsed for settings but not rendered.
 */
export function parseTypst(source: string): JSONContent {
  const lines = source.split('\n');
  const nodes: JSONContent[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip preamble / directive lines
    if (
      line.startsWith('#set ') ||
      line.startsWith('#let ') ||
      line.startsWith('#show ') ||
      line.startsWith('#import ')
    ) {
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Headings: = H1, == H2, etc.
    const headingMatch = line.match(/^(={1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      nodes.push({
        type: 'heading',
        attrs: { level },
        content: parseInlineTypst(headingMatch[2]),
      });
      i++;
      continue;
    }

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      nodes.push({
        type: 'codeBlock',
        attrs: { language: lang || null },
        content: [{ type: 'text', text: codeLines.join('\n') }],
      });
      continue;
    }

    // Task list: - [x] or - [ ]
    if (line.match(/^- \[(x| )\] /)) {
      const items: JSONContent[] = [];
      while (i < lines.length && lines[i].match(/^- \[(x| )\] /)) {
        const checked = lines[i].startsWith('- [x]');
        const content = lines[i].replace(/^- \[.\] /, '');
        items.push({
          type: 'taskItem',
          attrs: { checked },
          content: [{ type: 'paragraph', content: parseInlineTypst(content) }],
        });
        i++;
      }
      nodes.push({ type: 'taskList', content: items });
      continue;
    }

    // Bullet list
    if (line.startsWith('- ')) {
      const items: JSONContent[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: parseInlineTypst(lines[i].slice(2)) }],
        });
        i++;
      }
      nodes.push({ type: 'bulletList', content: items });
      continue;
    }

    // Ordered list
    if (line.startsWith('+ ')) {
      const items: JSONContent[] = [];
      while (i < lines.length && lines[i].startsWith('+ ')) {
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: parseInlineTypst(lines[i].slice(2)) }],
        });
        i++;
      }
      nodes.push({ type: 'orderedList', content: items });
      continue;
    }

    // Aligned paragraph: #align(center)[...]
    const alignMatch = line.match(/^#align\((left|center|right)\)\[(.+)\]$/);
    if (alignMatch) {
      nodes.push({
        type: 'paragraph',
        attrs: { textAlign: alignMatch[1] },
        content: parseInlineTypst(alignMatch[2]),
      });
      i++;
      continue;
    }

    // Justified paragraph: #par(justify: true)[...]
    const justifyMatch = line.match(/^#par\(justify:\s*true\)\[(.+)\]$/);
    if (justifyMatch) {
      nodes.push({
        type: 'paragraph',
        attrs: { textAlign: 'justify' },
        content: parseInlineTypst(justifyMatch[1]),
      });
      i++;
      continue;
    }

    // Horizontal rule
    if (line.startsWith('#line(length: 100%)')) {
      nodes.push({ type: 'horizontalRule' });
      i++;
      continue;
    }

    // Page break
    if (line.startsWith('#pagebreak()')) {
      nodes.push({ type: 'pageBreak' });
      i++;
      continue;
    }

    // Table of Contents
    if (line.startsWith('#outline()')) {
      nodes.push({ type: 'tableOfContents' });
      i++;
      continue;
    }

    // Block quote: #quote[...]
    if (line.startsWith('#quote[')) {
      const bracketStart = line.indexOf('[');
      const bracketEnd = findClosingBracket(line, bracketStart);
      if (bracketEnd !== -1) {
        const inner = line.slice(bracketStart + 1, bracketEnd);
        nodes.push({
          type: 'blockquote',
          content: [{ type: 'paragraph', content: parseInlineTypst(inner) }],
        });
        i++;
        continue;
      }
    }

    // Display math block: $ formula $ (on its own line)
    if (line.startsWith('$ ') && line.endsWith(' $') && line.length > 4) {
      const formula = line.slice(2, -2);
      nodes.push({ type: 'mathBlock', attrs: { formula } });
      i++;
      continue;
    }

    // Image: #image("src", width: ...)
    const imageMatch = line.match(/^#image\("([^"]+)"(?:,\s*(.+))?\)/);
    if (imageMatch) {
      const src = imageMatch[1];
      const rest = imageMatch[2] || '';
      const widthMatch = rest.match(/width:\s*(\S+)/);
      const altMatch = rest.match(/alt:\s*"([^"]+)"/);
      nodes.push({
        type: 'image',
        attrs: {
          src,
          ...(widthMatch && { width: widthMatch[1].replace(/,\s*$/, '') }),
          ...(altMatch && { alt: altMatch[1] }),
        },
      });
      i++;
      continue;
    }

    // Table: #table(columns: N, [...], [...], ...)
    if (line.startsWith('#table(')) {
      const tableLines: string[] = [line];
      if (!line.endsWith(')')) {
        i++;
        while (i < lines.length) {
          tableLines.push(lines[i]);
          if (lines[i].trimEnd() === ')') { i++; break; }
          i++;
        }
      } else {
        i++;
      }
      const tableStr = tableLines.join('\n');
      const colsMatch = tableStr.match(/columns:\s*(\d+)/);
      const colCount = colsMatch ? parseInt(colsMatch[1]) : 1;
      // Extract cell contents: [...]
      const cellRegex = /\[([^\]]*)\]/g;
      const cells: string[] = [];
      let cellMatch;
      // Skip the first match if it's part of column spec
      const afterColumns = tableStr.indexOf(',', tableStr.indexOf('columns'));
      const searchStr = afterColumns !== -1 ? tableStr.slice(afterColumns) : tableStr;
      while ((cellMatch = cellRegex.exec(searchStr)) !== null) {
        cells.push(cellMatch[1]);
      }
      // Build table rows
      const rows: JSONContent[] = [];
      for (let r = 0; r < cells.length; r += colCount) {
        const rowCells: JSONContent[] = [];
        for (let c = 0; c < colCount && r + c < cells.length; c++) {
          rowCells.push({
            type: 'tableCell',
            content: [{ type: 'paragraph', content: parseInlineTypst(cells[r + c]) }],
          });
        }
        rows.push({ type: 'tableRow', content: rowCells });
      }
      if (rows.length > 0) {
        nodes.push({ type: 'table', content: rows });
      }
      continue;
    }

    // #text(params)[content] at block level — treat as styled paragraph
    if (line.startsWith('#text(')) {
      const parenStart = 5;
      const parenEnd = findClosingParen(line, parenStart);
      if (parenEnd !== -1 && line[parenEnd + 1] === '[') {
        const bracketEnd = findClosingBracket(line, parenEnd + 1);
        if (bracketEnd !== -1) {
          const paramsStr = line.slice(parenStart + 1, parenEnd);
          const innerText = line.slice(parenEnd + 2, bracketEnd);
          const attrs = parseTextFunc(paramsStr);
          const innerNodes = parseInlineTypst(innerText);
          for (const node of innerNodes) {
            if (node.type === 'text') {
              node.marks = [...(node.marks || []), { type: 'textStyle', attrs }];
            }
          }
          nodes.push({ type: 'paragraph', content: innerNodes });
          i++;
          continue;
        }
      }
    }

    // Plain paragraph: collect consecutive non-structural lines
    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      if (l.trim() === '') break;
      if (
        l.match(/^={1,6}\s/) ||
        l.startsWith('- ') ||
        l.startsWith('+ ') ||
        l.startsWith('```') ||
        l.startsWith('#set ') ||
        l.startsWith('#let ') ||
        l.startsWith('#show ') ||
        l.startsWith('#import ') ||
        l.startsWith('#align(') ||
        l.startsWith('#par(') ||
        l.startsWith('#line(length:') ||
        l.startsWith('#pagebreak()') ||
        l.startsWith('#outline()') ||
        l.startsWith('#quote[') ||
        l.startsWith('#image(') ||
        l.startsWith('#table(') ||
        l.startsWith('#text(') ||
        (l.startsWith('$ ') && l.endsWith(' $'))
      )
        break;
      paragraphLines.push(l);
      i++;
    }

    if (paragraphLines.length > 0) {
      nodes.push({
        type: 'paragraph',
        content: parseInlineTypst(paragraphLines.join(' ')),
      });
    }
  }

  if (nodes.length === 0) {
    nodes.push({ type: 'paragraph' });
  }

  return { type: 'doc', content: nodes };
}
