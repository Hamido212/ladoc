'use client';

import { useTranslations } from 'next-intl';
import { useEditorStore } from '@/stores/editor-store';
import { useDocumentStore } from '@/stores/document-store';

interface StatusBarProps {
  collabStatus?: 'connecting' | 'connected' | 'disconnected';
  connectedUsers?: number;
}

export function StatusBar({ collabStatus, connectedUsers }: StatusBarProps) {
  const t = useTranslations('status');
  const { stats } = useEditorStore();
  const { documentId, isSaving, lastSavedAt, saveError } = useDocumentStore();

  return (
    <div className="flex items-center justify-between px-3 py-1 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
      <div className="flex items-center gap-4">
        <span>
          {stats.words} {t('words')}
        </span>
        <span>
          {stats.characters} {t('characters')}
        </span>
        {stats.pages > 0 && (
          <span>
            {stats.pages} {t('pages')}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {/* Collaboration status */}
        {collabStatus && collabStatus !== 'disconnected' && (
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                collabStatus === 'connected' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
              }`}
            />
            {connectedUsers != null && connectedUsers > 1 && (
              <span className="text-gray-400">
                {connectedUsers} {t('online')}
              </span>
            )}
          </span>
        )}
        {/* Save status */}
        {documentId && (
          <span className={saveError ? 'text-red-500' : 'text-gray-400'}>
            {isSaving
              ? '...'
              : saveError
                ? saveError
                : lastSavedAt
                  ? `${t('saved')} ${lastSavedAt.toLocaleTimeString()}`
                  : t('unsaved')}
          </span>
        )}
        <span className="text-gray-400">ladoc</span>
      </div>
    </div>
  );
}
