import { Node, mergeAttributes } from '@tiptap/react';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    citation: {
      insertCitation: (citeKey: string, label?: string) => ReturnType;
    };
  }
}

/**
 * Citation node: renders as @citeKey in Typst.
 * Displayed as [Author Year] style chip in the editor.
 */
export const Citation = Node.create({
  name: 'citation',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      citeKey: { default: '' },
      label: { default: '' }, // Display label like "Knuth 1984"
    };
  },

  parseHTML() {
    return [
      { tag: 'span[data-citation]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const citeKey = HTMLAttributes.citeKey || '';
    const label = HTMLAttributes.label || citeKey;
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-citation': citeKey,
        class: 'inline-flex items-center px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-sm border border-amber-200 cursor-default',
        title: `@${citeKey}`,
        contenteditable: 'false',
      }),
      `[${label}]`,
    ];
  },

  addCommands() {
    return {
      insertCitation:
        (citeKey: string, label?: string) =>
        ({ commands }: { commands: { insertContent: (content: Record<string, unknown>) => boolean } }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { citeKey, label: label || citeKey },
          });
        },
    } as Record<string, (...args: unknown[]) => unknown>;
  },
});
