'use client';

import { useTranslations } from 'next-intl';
import { useEditorStore } from '@/stores/editor-store';
import { Loader2, AlertCircle } from 'lucide-react';

export function PreviewPane() {
  const t = useTranslations('editor');
  const { svgContent, isCompiling, compilationError } = useEditorStore();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 bg-white">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Preview
        </span>
        {isCompiling && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Loader2 className="w-3 h-3 animate-spin" />
            {t('compilingPreview')}
          </div>
        )}
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4">
        {compilationError ? (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{t('previewError')}</p>
              <p className="mt-1 text-xs text-red-600 font-mono whitespace-pre-wrap">
                {compilationError}
              </p>
            </div>
          </div>
        ) : svgContent ? (
          <div className="flex justify-center">
            <div
              className="bg-white shadow-lg border border-gray-200 max-w-full"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            {isCompiling ? t('compilingPreview') : t('loading')}
          </div>
        )}
      </div>
    </div>
  );
}
