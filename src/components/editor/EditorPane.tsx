'use client';

import { EditorContent, type Editor } from '@tiptap/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TableToolbar } from './TableToolbar';

interface EditorPaneProps {
  editor: Editor | null;
}

export function EditorPane({ editor }: EditorPaneProps) {
  const t = useTranslations('editor');
  const [isDragOver, setIsDragOver] = useState(false);

  function insertImageFromFile(file: File) {
    if (!editor || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src) editor.chain().focus().setImage({ src }).run();
    };
    reader.readAsDataURL(file);
  }

  if (!editor) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Loading editor...
      </div>
    );
  }

  return (
    <div
      className={`flex-1 overflow-auto bg-white relative ${isDragOver ? 'ring-2 ring-inset ring-blue-400' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes('Files')) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) insertImageFromFile(file);
      }}
    >
      {isDragOver && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-blue-50/80 pointer-events-none">
          <p className="text-blue-600 font-medium text-sm">{t('dropImage')}</p>
        </div>
      )}
      <TableToolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-full" />
    </div>
  );
}
