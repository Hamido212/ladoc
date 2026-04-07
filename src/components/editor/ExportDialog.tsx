'use client';

import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import { Download, X, FileText, FileCode, FileType, Printer, GraduationCap } from 'lucide-react';
import { useEditorStore } from '@/stores/editor-store';
import { useCallback } from 'react';
import { exportToLatex } from '@/lib/export/latex';

import type { Editor } from '@tiptap/react';

interface ExportDialogProps {
  editor?: Editor | null;
}

export function ExportDialog({ editor }: ExportDialogProps = {}) {
  const t = useTranslations('export');
  const { typstSource, svgContent, documentMeta, pageSettings } = useEditorStore();

  const filename = documentMeta.title?.replace(/\s+/g, '_') || 'document';

  const downloadFile = useCallback(
    (content: string, ext: string, mimeType: string) => {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [filename]
  );

  const exportTypst = useCallback(() => {
    downloadFile(typstSource, 'typ', 'text/plain;charset=utf-8');
  }, [typstSource, downloadFile]);

  const exportPlainText = useCallback(() => {
    // Strip Typst markup to get plain text (simple approach)
    const plain = typstSource
      .replace(/^#set\s.*$/gm, '') // remove preamble
      .replace(/^#let\s.*$/gm, '')
      .replace(/^#show\s.*$/gm, '')
      .replace(/^#import\s.*$/gm, '')
      .replace(/^(=+)\s/gm, '') // remove heading markers
      .replace(/\*(.+?)\*/g, '$1') // remove bold
      .replace(/_(.+?)_/g, '$1') // remove italic
      .replace(/#underline\[(.+?)\]/g, '$1')
      .replace(/#strike\[(.+?)\]/g, '$1')
      .replace(/#align\(\w+\)\[(.+?)\]/g, '$1')
      .replace(/#line\(length: 100%\)/g, '---')
      .replace(/#pagebreak\(\)/g, '\n---\n')
      .replace(/^\s*\n/gm, '\n')
      .trim();
    downloadFile(plain, 'txt', 'text/plain;charset=utf-8');
  }, [typstSource, downloadFile]);

  const exportSvg = useCallback(() => {
    if (!svgContent) return;
    downloadFile(svgContent, 'svg', 'image/svg+xml;charset=utf-8');
  }, [svgContent, downloadFile]);

  const handlePrint = useCallback(() => {
    if (!svgContent) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${documentMeta.title || 'ladoc'}</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>${svgContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }, [svgContent, documentMeta.title]);

  const exportLatex = useCallback(() => {
    if (!editor) return;
    const json = editor.getJSON();
    const latex = exportToLatex(json, {
      fontSize: documentMeta.fontSize || '11pt',
      pageSize: pageSettings.pageSize || 'a4paper',
    });
    downloadFile(latex, 'tex', 'text/plain;charset=utf-8');
  }, [editor, documentMeta.fontSize, pageSettings.pageSize, downloadFile]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          title={t('title')}
          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl p-6 w-[400px] max-w-[95vw]">
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-base font-semibold text-gray-900">
              {t('title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-2">
            <Dialog.Close asChild>
              <button
                type="button"
                onClick={exportSvg}
                disabled={!svgContent}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {t('svg')}
                  </div>
                  <div className="text-xs text-gray-500">{t('svgDesc')}</div>
                </div>
              </button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button
                type="button"
                onClick={exportTypst}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left"
              >
                <FileCode className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {t('typst')}
                  </div>
                  <div className="text-xs text-gray-500">{t('typstDesc')}</div>
                </div>
              </button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button
                type="button"
                onClick={exportPlainText}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left"
              >
                <FileType className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {t('plainText')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('plainTextDesc')}
                  </div>
                </div>
              </button>
            </Dialog.Close>

            {editor && (
              <Dialog.Close asChild>
                <button
                  type="button"
                  onClick={exportLatex}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left"
                >
                  <GraduationCap className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {t('latex')}
                    </div>
                    <div className="text-xs text-gray-500">{t('latexDesc')}</div>
                  </div>
                </button>
              </Dialog.Close>
            )}

            <div className="border-t border-gray-100 my-2" />

            <Dialog.Close asChild>
              <button
                type="button"
                onClick={handlePrint}
                disabled={!svgContent}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Printer className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {t('print')}
                  </div>
                  <div className="text-xs text-gray-500">{t('printDesc')}</div>
                </div>
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
