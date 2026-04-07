import { Node, mergeAttributes } from '@tiptap/react';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    footnote: {
      insertFootnote: (content: string) => ReturnType;
    };
  }
}

/**
 * Footnote node: renders as #footnote[content] in Typst.
 * Displayed inline as a superscript marker in the editor.
 */
export const Footnote = Node.create({
  name: 'footnote',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      content: { default: '' },
    };
  },

  parseHTML() {
    return [
      { tag: 'span[data-footnote]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const content = HTMLAttributes.content || '';
    // Show truncated content as tooltip
    const preview = content.length > 30 ? content.slice(0, 30) + '...' : content;
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-footnote': '',
        class: 'inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-gray-500 rounded-full cursor-default align-super',
        title: preview,
        contenteditable: 'false',
      }),
      '†',
    ];
  },

  addCommands() {
    return {
      insertFootnote:
        (content: string) =>
        ({ commands }: { commands: { insertContent: (content: Record<string, unknown>) => boolean } }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { content },
          });
        },
    } as Record<string, (...args: unknown[]) => unknown>;
  },
});
