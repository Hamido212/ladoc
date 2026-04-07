import { Node, mergeAttributes } from '@tiptap/react';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    tableOfContents: {
      insertTableOfContents: () => ReturnType;
    };
  }
}

/**
 * Table of Contents node: renders as #outline() in Typst.
 * Displayed as a placeholder block in the editor.
 */
export const TableOfContents = Node.create({
  name: 'tableOfContents',
  group: 'block',
  atom: true,

  parseHTML() {
    return [
      { tag: 'div[data-toc]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-toc': '',
        class: 'my-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-sm text-gray-500 bg-gray-50/50',
        contenteditable: 'false',
      }),
      '📋 Table of Contents / Inhaltsverzeichnis',
    ];
  },

  addCommands() {
    return {
      insertTableOfContents:
        () =>
        ({ commands }: { commands: { insertContent: (content: Record<string, unknown>) => boolean } }) => {
          return commands.insertContent({ type: this.name });
        },
    } as Record<string, (...args: unknown[]) => unknown>;
  },
});
