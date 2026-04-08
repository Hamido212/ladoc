'use client';

import { useTranslations } from 'next-intl';
import type { Editor } from '@tiptap/react';
import { useEditorStore } from '@/stores/editor-store';
import { useRef, useState } from 'react';
import { PageSettingsDialog } from './PageSettingsDialog';
import { ExportDialog } from './ExportDialog';
import { TemplateGallery } from '../templates/TemplateGallery';
import { VersionHistory } from './VersionHistory';
import { FootnoteDialog } from './FootnoteDialog';
import { MathEditor } from '../math/MathEditor';
import { CitationSearch } from '../citations/CitationSearch';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import Link from 'next/link';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Image as ImageIcon,
  Table,
  Code2,
  Minus,
  Undo2,
  Redo2,
  Eye,
  FileCode,
  Columns2,
  Type,
  ListTodo,
  Quote,
  SeparatorHorizontal,
  Sigma,
  Footprints,
  TableOfContents,
  ArrowLeft,
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor | null;
}

function ToolbarButton({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`rounded-md p-1.5 transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      } ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'} `}
    >
      {children}
    </button>
  );
}

function ToolbarSeparator() {
  return <div className="mx-1 h-6 w-px bg-gray-200" />;
}

function FontSizeSelect({ editor }: { editor: Editor }) {
  const t = useTranslations('toolbar');

  const sizes = ['10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt', '28pt', '32pt'];
  const currentSize = editor.getAttributes('textStyle').fontSize || '11pt';

  return (
    <select
      title={t('fontSize')}
      value={currentSize}
      onChange={(e) => {
        const size = e.target.value;
        if (size === '11pt') {
          editor.chain().focus().unsetFontSize().run();
        } else {
          editor.chain().focus().setFontSize(size).run();
        }
      }}
      className="h-8 rounded-md border border-gray-200 bg-white px-1.5 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    >
      {sizes.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
}

function FontFamilySelect({ editor }: { editor: Editor }) {
  const t = useTranslations('toolbar');

  const fonts = [
    { value: '', label: 'Default' },
    { value: 'serif', label: 'Serif' },
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Verdana', label: 'Verdana' },
  ];
  const currentFont = editor.getAttributes('textStyle').fontFamily || '';

  return (
    <select
      title={t('fontFamily')}
      value={currentFont}
      onChange={(e) => {
        const font = e.target.value;
        if (!font) {
          editor.chain().focus().unsetFontFamily().run();
        } else {
          editor.chain().focus().setFontFamily(font).run();
        }
      }}
      className="h-8 max-w-[140px] rounded-md border border-gray-200 bg-white px-1.5 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    >
      {fonts.map((font) => (
        <option key={font.value} value={font.value}>
          {font.label}
        </option>
      ))}
    </select>
  );
}

function ColorPicker({
  editor,
  title,
  icon: Icon,
  attribute,
  setter,
}: {
  editor: Editor;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  attribute: string;
  setter: (color: string) => void;
}) {
  const currentColor = editor.getAttributes('textStyle')[attribute] || '#000000';

  return (
    <label title={title} className="relative cursor-pointer">
      <div className="rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900">
        <Icon className="h-4 w-4" />
        <div
          className="mx-auto -mt-0.5 h-0.5 w-4"
          style={{ backgroundColor: currentColor as string }}
        />
      </div>
      <input
        type="color"
        value={currentColor as string}
        onChange={(e) => setter(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  );
}

export function Toolbar({ editor }: ToolbarProps) {
  const t = useTranslations('toolbar');
  const { viewMode, setViewMode } = useEditorStore();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [mathOpen, setMathOpen] = useState(false);
  const [footnoteOpen, setFootnoteOpen] = useState(false);

  function handleImageFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src) editor?.chain().focus().setImage({ src }).run();
    };
    reader.readAsDataURL(file);
  }

  if (!editor) return null;

  const iconSize = 'w-4 h-4';

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-white px-3 py-1.5">
      {/* Back to Dashboard */}
      <Link
        href="/dashboard"
        className="rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        title={t('backToDashboard')}
      >
        <ArrowLeft className={iconSize} />
      </Link>

      <ToolbarSeparator />

      {/* Undo / Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title={t('undo')}
      >
        <Undo2 className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title={t('redo')}
      >
        <Redo2 className={iconSize} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Font Family & Size */}
      <FontFamilySelect editor={editor} />
      <FontSizeSelect editor={editor} />

      <ToolbarSeparator />

      {/* Text Formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title={t('bold')}
      >
        <Bold className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title={t('italic')}
      >
        <Italic className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title={t('underline')}
      >
        <Underline className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        title={t('strikethrough')}
      >
        <Strikethrough className={iconSize} />
      </ToolbarButton>

      {/* Text Color */}
      <ColorPicker
        editor={editor}
        title={t('textColor')}
        icon={Type}
        attribute="color"
        setter={(color) => editor.chain().focus().setColor(color).run()}
      />

      {/* Highlight */}
      <ColorPicker
        editor={editor}
        title={t('highlight')}
        icon={Highlighter}
        attribute="backgroundColor"
        setter={(color) => editor.chain().focus().toggleHighlight({ color }).run()}
      />

      <ToolbarSeparator />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title={t('heading1')}
      >
        <Heading1 className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title={t('heading2')}
      >
        <Heading2 className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        title={t('heading3')}
      >
        <Heading3 className={iconSize} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title={t('bulletList')}
      >
        <List className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title={t('orderedList')}
      >
        <ListOrdered className={iconSize} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        title={t('alignLeft')}
      >
        <AlignLeft className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        title={t('alignCenter')}
      >
        <AlignCenter className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        title={t('alignRight')}
      >
        <AlignRight className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}
        title={t('alignJustify')}
      >
        <AlignJustify className={iconSize} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Insert */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageFile(file);
          e.target.value = '';
        }}
      />
      <ToolbarButton onClick={() => imageInputRef.current?.click()} title={t('image')}>
        <ImageIcon className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
        title={t('table')}
      >
        <Table className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        title={t('codeBlock')}
      >
        <Code2 className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title={t('horizontalRule')}
      >
        <Minus className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editor.isActive('taskList')}
        title={t('taskList')}
      >
        <ListTodo className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title={t('blockquote')}
      >
        <Quote className={iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          (editor.chain().focus() as unknown as { setPageBreak: () => void }).setPageBreak()
        }
        title={t('pageBreak')}
      >
        <SeparatorHorizontal className={iconSize} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Math, Footnote, Citation, TOC */}
      <ToolbarButton onClick={() => setMathOpen(true)} title={t('math')}>
        <Sigma className={iconSize} />
      </ToolbarButton>
      <MathEditor
        open={mathOpen}
        onOpenChange={setMathOpen}
        onInsert={(formula, display) => {
          if (display) {
            (
              editor.commands as unknown as { insertMathBlock: (f: string) => boolean }
            ).insertMathBlock(formula);
          } else {
            (
              editor.commands as unknown as { insertMath: (f: string, d: boolean) => boolean }
            ).insertMath(formula, false);
          }
        }}
      />

      <ToolbarButton onClick={() => setFootnoteOpen(true)} title={t('footnote')}>
        <Footprints className={iconSize} />
      </ToolbarButton>
      <FootnoteDialog editor={editor} open={footnoteOpen} onOpenChange={setFootnoteOpen} />

      <CitationSearch editor={editor} />

      <ToolbarButton
        onClick={() => editor.chain().focus().insertTableOfContents().run()}
        title={t('toc')}
      >
        <TableOfContents className={iconSize} />
      </ToolbarButton>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Version History */}
      <VersionHistory editor={editor} />

      {/* Export */}
      <ExportDialog editor={editor} />

      {/* Templates */}
      <TemplateGallery editor={editor} />

      {/* Page Settings */}
      <PageSettingsDialog />

      {/* View Mode Toggle */}
      <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 p-0.5">
        <ToolbarButton
          onClick={() => setViewMode('visual')}
          isActive={viewMode === 'visual'}
          title={t('visualView')}
        >
          <Eye className={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setViewMode('split')}
          isActive={viewMode === 'split'}
          title={t('visualView') + ' + ' + t('codeView')}
        >
          <Columns2 className={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setViewMode('code')}
          isActive={viewMode === 'code'}
          title={t('codeView')}
        >
          <FileCode className={iconSize} />
        </ToolbarButton>
      </div>

      {/* Language */}
      <LanguageSwitcher />
    </div>
  );
}
