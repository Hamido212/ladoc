'use client';

import { useEditor as useTipTapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import ImageExtension from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { useEditorStore } from '@/stores/editor-store';
import { serialize, countWords, countCharacters } from '@/lib/typst/serializer';
import { useTypstCompiler } from './useTypstCompiler';
import { MathInline, MathBlock } from '@/lib/editor/extensions/typst-math';
import { Footnote } from '@/lib/editor/extensions/typst-footnote';
import { Citation } from '@/lib/editor/extensions/typst-citation';
import { TableOfContents } from '@/lib/editor/extensions/typst-toc';

// Custom extensions
import { Extension, Node } from '@tiptap/react';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
        },
    };
  },
});

// Keyboard shortcuts for text alignment (not in TipTap by default)
const AlignmentShortcuts = Extension.create({
  name: 'alignmentShortcuts',
  addKeyboardShortcuts() {
    return {
      'Mod-Shift-l': () => this.editor.chain().focus().setTextAlign('left').run(),
      'Mod-Shift-e': () => this.editor.chain().focus().setTextAlign('center').run(),
      'Mod-Shift-r': () => this.editor.chain().focus().setTextAlign('right').run(),
      'Mod-Shift-j': () => this.editor.chain().focus().setTextAlign('justify').run(),
    };
  },
});

// Page break node
const PageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  atom: true,

  parseHTML() {
    return [{ tag: 'div[data-page-break]' }];
  },

  renderHTML() {
    return [
      'div',
      {
        'data-page-break': '',
        style:
          'border-top: 2px dashed #cbd5e1; margin: 1.5rem 0; position: relative; text-align: center;',
      },
      [
        'span',
        {
          style:
            'background: white; padding: 0 0.5rem; position: relative; top: -0.65rem; font-size: 0.7rem; color: #94a3b8;',
        },
        'Seitenumbruch',
      ],
    ];
  },

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({
          chain,
        }: {
          chain: () => { insertContent: (content: { type: string }) => { run: () => boolean } };
        }) => {
          return chain().insertContent({ type: this.name }).run();
        },
    } as Record<string, () => (...args: unknown[]) => boolean>;
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () =>
        (this.editor.commands as unknown as { setPageBreak: () => boolean }).setPageBreak(),
    };
  },
});

export function useLadocEditor(
  placeholder: string,
  initialContent?: object,
  extraExtensions?: Parameters<typeof useTipTapEditor>[0]['extensions']
) {
  const { setTypstSource, setStats, pageSettings, documentMeta } = useEditorStore();
  const { compile } = useTypstCompiler();
  const hasCollaboration = extraExtensions?.some(
    (extension) => extension?.name === 'collaboration'
  );

  const editor = useTipTapEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        undoRedo: hasCollaboration ? false : undefined,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      AlignmentShortcuts,
      Highlight.configure({
        multicolor: true,
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      PageBreak,
      MathInline,
      MathBlock,
      Footnote,
      Citation,
      TableOfContents,
      ...(extraExtensions || []),
    ],
    immediatelyRender: false,
    content: initialContent || '<p></p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-full p-6',
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();

      // Update stats
      setStats({
        words: countWords(json),
        characters: countCharacters(json),
      });

      // Serialize to Typst
      const typstCode = serialize(json, {
        pageSettings: {
          pageSize: pageSettings.pageSize,
          orientation: pageSettings.orientation,
          margins: pageSettings.margins,
        },
        fontFamily: documentMeta.fontFamily,
        fontSize: documentMeta.fontSize,
        preamble: documentMeta.preamble,
      });

      setTypstSource(typstCode);

      // Trigger compilation
      compile(typstCode);
    },
  });

  return editor;
}
