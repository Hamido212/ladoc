'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import { History, X, RotateCcw, Trash2, Plus, Clock } from 'lucide-react';
import type { Editor } from '@tiptap/react';
import { useDocumentStore } from '@/stores/document-store';
import { useEditorStore } from '@/stores/editor-store';

interface Version {
  id: string;
  label: string | null;
  createdAt: string;
  content?: object;
  typstSource?: string;
}

interface VersionHistoryProps {
  editor: Editor | null;
}

export function VersionHistory({ editor }: VersionHistoryProps) {
  const t = useTranslations('versionHistory');
  const { documentId } = useDocumentStore();
  const { setTypstSource } = useEditorStore();
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [label, setLabel] = useState('');

  const fetchVersions = useCallback(async () => {
    if (!documentId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/documents/${documentId}/versions`);
      if (res.ok) {
        const data = await res.json();
        setVersions(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    if (open && documentId) {
      fetchVersions();
    }
  }, [open, documentId, fetchVersions]);

  const createVersion = async () => {
    if (!documentId) return;
    setCreating(true);
    try {
      const res = await fetch(`/api/documents/${documentId}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: label || undefined }),
      });
      if (res.ok) {
        setLabel('');
        fetchVersions();
      }
    } catch {
      // ignore
    } finally {
      setCreating(false);
    }
  };

  const restoreVersion = async (versionId: string) => {
    if (!documentId || !editor) return;
    try {
      const res = await fetch(`/api/documents/${documentId}/versions/${versionId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const doc = await res.json();
        // Update editor with restored content
        if (doc.content) {
          editor.commands.setContent(doc.content, { emitUpdate: false });
        }
        if (doc.typstSource) {
          setTypstSource(doc.typstSource);
        }
        setOpen(false);
      }
    } catch {
      // ignore
    }
  };

  const deleteVersion = async (versionId: string) => {
    if (!documentId) return;
    try {
      const res = await fetch(`/api/documents/${documentId}/versions/${versionId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setVersions((prev) => prev.filter((v) => v.id !== versionId));
      }
    } catch {
      // ignore
    }
  };

  // Only show for authenticated documents
  if (!documentId) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
          title={t('title')}
        >
          <History className="w-4 h-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Dialog.Title className="font-semibold text-lg">
              {t('title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 rounded hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Create snapshot */}
          <div className="p-4 border-b space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={t('labelPlaceholder')}
                className="flex-1 px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={createVersion}
                disabled={creating}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                {t('createSnapshot')}
              </button>
            </div>
          </div>

          {/* Version list */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                {t('loading')}
              </div>
            ) : versions.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                {t('noVersions')}
              </div>
            ) : (
              <ul className="divide-y">
                {versions.map((version) => (
                  <li key={version.id} className="p-4 hover:bg-gray-50 group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {version.label || t('untitled')}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(version.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => restoreVersion(version.id)}
                          className="p-1.5 rounded hover:bg-blue-100 text-blue-600"
                          title={t('restore')}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteVersion(version.id)}
                          className="p-1.5 rounded hover:bg-red-100 text-red-600"
                          title={t('delete')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
