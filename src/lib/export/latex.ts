import type { JSONContent } from '@tiptap/react';

/**
 * TipTap JSON → LaTeX converter.
 * Produces a standalone .tex file that can be compiled with pdflatex/xelatex.
 */

interface LatexOptions {
  documentClass?: string;
  fontFamily?: string;
  fontSize?: string;
  pageSize?: string;
}

function escapeLatex(text: string): string {
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[&%$#_{}]/g, (m) => `\\${m}`)
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

function serializeMarksLatex(
  text: string,
  marks: Array<{ type: string; attrs?: Record<string, unknown> }>
): string {
  let result = escapeLatex(text);

  for (const mark of marks || []) {
    switch (mark.type) {
      case 'bold':
        result = `\\textbf{${result}}`;
        break;
      case 'italic':
        result = `\\textit{${result}}`;
        break;
      case 'underline':
        result = `\\underline{${result}}`;
        break;
      case 'strike':
        result = `\\sout{${result}}`;
        break;
      case 'code':
        result = `\\texttt{${result}}`;
        break;
      case 'link':
        result = `\\href{${mark.attrs?.href || ''}}{${result}}`;
        break;
    }
  }

  return result;
}

function serializeInlineLatex(node: JSONContent): string {
  if (!node.content) return '';
  return node.content
    .map((child) => {
      if (child.type === 'text') {
        return serializeMarksLatex(child.text || '', child.marks || []);
      }
      if (child.type === 'hardBreak') return '\\\\';
      if (child.type === 'mathInline') {
        const formula = child.attrs?.formula || '';
        return child.attrs?.display ? `\\[${formula}\\]` : `$${formula}$`;
      }
      if (child.type === 'footnote') {
        return `\\footnote{${escapeLatex(child.attrs?.content || '')}}`;
      }
      if (child.type === 'citation') {
        return `\\cite{${child.attrs?.citeKey || ''}}`;
      }
      return '';
    })
    .join('');
}

function serializeNodeLatex(node: JSONContent): string {
  switch (node.type) {
    case 'doc':
      return (node.content || []).map(serializeNodeLatex).join('');

    case 'heading': {
      const level = (node.attrs?.level as number) || 1;
      const commands = ['\\section', '\\subsection', '\\subsubsection', '\\paragraph', '\\subparagraph', '\\subparagraph'];
      const cmd = commands[Math.min(level - 1, commands.length - 1)];
      return `${cmd}{${serializeInlineLatex(node)}}\n\n`;
    }

    case 'paragraph': {
      const content = serializeInlineLatex(node);
      if (!content) return '\n';
      const align = node.attrs?.textAlign;
      if (align === 'center') return `\\begin{center}\n${content}\n\\end{center}\n\n`;
      if (align === 'right') return `\\begin{flushright}\n${content}\n\\end{flushright}\n\n`;
      return `${content}\n\n`;
    }

    case 'bulletList':
      return `\\begin{itemize}\n${(node.content || []).map((item) => {
        const content = item.content?.map(serializeNodeLatex).join('').trim();
        return `  \\item ${content}`;
      }).join('\n')}\n\\end{itemize}\n\n`;

    case 'orderedList':
      return `\\begin{enumerate}\n${(node.content || []).map((item) => {
        const content = item.content?.map(serializeNodeLatex).join('').trim();
        return `  \\item ${content}`;
      }).join('\n')}\n\\end{enumerate}\n\n`;

    case 'codeBlock': {
      const lang = (node.attrs?.language as string) || '';
      const content = node.content?.[0]?.text || '';
      if (lang) {
        return `\\begin{lstlisting}[language=${lang}]\n${content}\n\\end{lstlisting}\n\n`;
      }
      return `\\begin{verbatim}\n${content}\n\\end{verbatim}\n\n`;
    }

    case 'blockquote':
      return `\\begin{quote}\n${(node.content || []).map(serializeNodeLatex).join('')}\\end{quote}\n\n`;

    case 'image': {
      const src = (node.attrs?.src as string) || '';
      const width = node.attrs?.width ? `width=${node.attrs.width}` : 'width=\\textwidth';
      return `\\begin{figure}[h]\n  \\centering\n  \\includegraphics[${width}]{${src}}\n\\end{figure}\n\n`;
    }

    case 'table': {
      const rows = node.content || [];
      const colCount = rows[0]?.content?.length || 0;
      const colSpec = Array(colCount).fill('l').join(' | ');
      let result = `\\begin{tabular}{| ${colSpec} |}\n\\hline\n`;
      for (const row of rows) {
        const cells = (row.content || []).map((cell) => {
          return cell.content?.map(serializeNodeLatex).join('').trim() || '';
        });
        result += `  ${cells.join(' & ')} \\\\\n\\hline\n`;
      }
      result += '\\end{tabular}\n\n';
      return result;
    }

    case 'horizontalRule':
      return '\\noindent\\rule{\\textwidth}{0.4pt}\n\n';

    case 'pageBreak':
      return '\\newpage\n\n';

    case 'mathBlock':
      return `\\[\n${node.attrs?.formula || ''}\n\\]\n\n`;

    case 'tableOfContents':
      return '\\tableofcontents\n\\newpage\n\n';

    case 'taskList':
      return `\\begin{itemize}\n${(node.content || []).map((item) => {
        const checked = item.attrs?.checked ? '$\\boxtimes$' : '$\\square$';
        const content = item.content?.map(serializeNodeLatex).join('').trim();
        return `  \\item[${checked}] ${content}`;
      }).join('\n')}\n\\end{itemize}\n\n`;

    default:
      if (node.content) {
        return node.content.map(serializeNodeLatex).join('');
      }
      return '';
  }
}

export function exportToLatex(doc: JSONContent, options: LatexOptions = {}): string {
  const {
    documentClass = 'article',
    fontSize = '11pt',
    pageSize = 'a4paper',
  } = options;

  const preamble = `\\documentclass[${fontSize},${pageSize}]{${documentClass}}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage{listings}
\\usepackage[normalem]{ulem}
\\usepackage{booktabs}

\\begin{document}

`;

  const body = serializeNodeLatex(doc);
  const closing = '\n\\end{document}\n';

  return preamble + body + closing;
}
