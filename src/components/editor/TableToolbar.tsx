'use client';

import type { Editor } from '@tiptap/react';
import { useTranslations } from 'next-intl';
import {
  Plus,
  Minus,
  Trash2,
  Rows3,
  Columns3,
  TableCellsMerge,
  TableCellsSplit,
} from 'lucide-react';

interface TableToolbarProps {
  editor: Editor;
}

export function TableToolbar({ editor }: TableToolbarProps) {
  const t = useTranslations('tableToolbar');

  if (!editor.isActive('table')) return null;

  const btn =
    'p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed';

  return (
    <div className="flex items-center gap-0.5 px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs">
      <span className="text-gray-400 font-medium mr-1">{t('label')}</span>

      <button
        type="button"
        title={t('addColumnBefore')}
        className={btn}
        onClick={() => editor.chain().focus().addColumnBefore().run()}
      >
        <Columns3 className="w-3.5 h-3.5" />
        <Plus className="w-2 h-2 absolute -top-0.5 -left-0.5" />
      </button>
      <button
        type="button"
        title={t('addColumnAfter')}
        className={btn}
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        <Plus className="w-3 h-3" />
        <span className="text-[10px] ml-0.5">{t('col')}</span>
      </button>
      <button
        type="button"
        title={t('deleteColumn')}
        className={btn}
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        <Minus className="w-3 h-3" />
        <span className="text-[10px] ml-0.5">{t('col')}</span>
      </button>

      <div className="w-px h-4 bg-gray-300 mx-1" />

      <button
        type="button"
        title={t('addRowBefore')}
        className={btn}
        onClick={() => editor.chain().focus().addRowBefore().run()}
      >
        <Plus className="w-3 h-3" />
        <span className="text-[10px] ml-0.5">{t('row')}</span>
      </button>
      <button
        type="button"
        title={t('deleteRow')}
        className={btn}
        onClick={() => editor.chain().focus().deleteRow().run()}
      >
        <Minus className="w-3 h-3" />
        <span className="text-[10px] ml-0.5">{t('row')}</span>
      </button>

      <div className="w-px h-4 bg-gray-300 mx-1" />

      <button
        type="button"
        title={t('mergeCells')}
        className={btn}
        disabled={!editor.can().mergeCells()}
        onClick={() => editor.chain().focus().mergeCells().run()}
      >
        <TableCellsMerge className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        title={t('splitCell')}
        className={btn}
        disabled={!editor.can().splitCell()}
        onClick={() => editor.chain().focus().splitCell().run()}
      >
        <TableCellsSplit className="w-3.5 h-3.5" />
      </button>

      <div className="w-px h-4 bg-gray-300 mx-1" />

      <button
        type="button"
        title={t('toggleHeader')}
        className={btn}
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
      >
        <Rows3 className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        title={t('deleteTable')}
        className={`${btn} text-red-500 hover:text-red-700 hover:bg-red-50`}
        onClick={() => editor.chain().focus().deleteTable().run()}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
