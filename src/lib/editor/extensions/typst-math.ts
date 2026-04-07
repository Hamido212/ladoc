import { Node, mergeAttributes } from '@tiptap/react';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    mathInline: {
      insertMath: (formula: string, display?: boolean) => ReturnType;
    };
  }
}

/**
 * Inline math node: renders $formula$ in Typst.
 * When display=true, renders as display math: $ formula $
 */
export const MathInline = Node.create({
  name: 'mathInline',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      formula: { default: '' },
      display: { default: false },
    };
  },

  parseHTML() {
    return [
      { tag: 'span[data-math]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const formula = HTMLAttributes.formula || '';
    const display = HTMLAttributes.display;
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-math': '',
        class: `inline-flex items-center px-1.5 py-0.5 rounded ${display ? 'bg-blue-50 text-blue-800' : 'bg-purple-50 text-purple-800'} font-mono text-sm`,
        contenteditable: 'false',
      }),
      display ? `$ ${formula} $` : `$${formula}$`,
    ];
  },

  addCommands() {
    return {
      insertMath:
        (formula: string, display = false) =>
        ({ commands }: { commands: { insertContent: (content: Record<string, unknown>) => boolean } }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { formula, display },
          });
        },
    } as Record<string, (...args: unknown[]) => unknown>;
  },
});

/**
 * Display math block node: renders on its own line as $ formula $
 */
export const MathBlock = Node.create({
  name: 'mathBlock',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      formula: { default: '' },
    };
  },

  parseHTML() {
    return [
      { tag: 'div[data-math-block]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const formula = HTMLAttributes.formula || '';
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-math-block': '',
        class: 'my-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200 text-center font-mono text-sm',
        contenteditable: 'false',
      }),
      `$ ${formula} $`,
    ];
  },

  addCommands() {
    return {
      insertMathBlock:
        (formula: string) =>
        ({ commands }: { commands: { insertContent: (content: Record<string, unknown>) => boolean } }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { formula },
          });
        },
    } as Record<string, (...args: unknown[]) => unknown>;
  },
});
