'use client';

import { useTranslations } from 'next-intl';
import { useEditorStore } from '@/stores/editor-store';
import { Loader2, AlertCircle } from 'lucide-react';

export function PreviewPane() {
  const t = useTranslations('editor');
  const { svgContent, isCompiling, compilationError } = useEditorStore();

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Preview Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
        <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
          {t('previewLabel')}
        </span>
        {isCompiling && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            {t('compilingPreview')}
          </div>
        )}
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4">
        {compilationError ? (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              <p className="font-medium">{t('previewError')}</p>
              <p className="mt-1 font-mono text-xs whitespace-pre-wrap text-red-600">
                {compilationError}
              </p>
            </div>
          </div>
        ) : svgContent ? (
          <div className="flex justify-center">
            <div
              className="max-w-full border border-gray-200 bg-white shadow-lg"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            {isCompiling ? t('compilingPreview') : t('loading')}
          </div>
        )}
      </div>
    </div>
  );
}
