'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { Editor } from '@tiptap/react';
import { useDocumentStore } from '@/stores/document-store';
import { useEditorStore } from '@/stores/editor-store';

const SAVE_DELAY = 2000;
const AUTO_SNAPSHOT_INTERVAL = 10 * 60 * 1000; // 10 minutes

export function useAutoSave(documentId: string | null, editor: Editor | null) {
  const { setSaving, setLastSavedAt, setDirty, setSaveError } = useDocumentStore();
  const { typstSource, pageSettings, documentMeta } = useEditorStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const snapshotTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSnapshotRef = useRef<number>(Date.now());

  const save = useCallback(async () => {
    if (!documentId || !editor) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setSaving(true);

    try {
      const res = await fetch(`/api/documents/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: editor.getJSON(),
          typstSource,
          pageSettings,
          documentMeta,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error('Save failed');

      setLastSavedAt(new Date());
      setDirty(false);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setSaveError('Save failed');
      }
    }
  }, [documentId, editor, typstSource, pageSettings, documentMeta, setSaving, setLastSavedAt, setDirty, setSaveError]);

  // Auto-snapshot every 10 minutes
  const createAutoSnapshot = useCallback(async () => {
    if (!documentId || !editor) return;
    const now = Date.now();
    if (now - lastSnapshotRef.current < AUTO_SNAPSHOT_INTERVAL) return;

    // Only snapshot if there have been changes
    if (!useDocumentStore.getState().isDirty && !useDocumentStore.getState().lastSavedAt) return;

    try {
      await fetch(`/api/documents/${documentId}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: 'Auto-save' }),
      });
      lastSnapshotRef.current = now;
    } catch {
      // Silent fail for auto-snapshots
    }
  }, [documentId, editor]);

  // Debounced save on content change
  const scheduleSave = useCallback(() => {
    if (!documentId) return;
    setDirty(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(save, SAVE_DELAY);
  }, [documentId, save, setDirty]);

  // Listen to editor updates
  useEffect(() => {
    if (!editor || !documentId) return;

    const handler = () => scheduleSave();
    editor.on('update', handler);
    return () => {
      editor.off('update', handler);
    };
  }, [editor, documentId, scheduleSave]);

  // Auto-snapshot interval
  useEffect(() => {
    if (!documentId) return;

    snapshotTimerRef.current = setInterval(createAutoSnapshot, AUTO_SNAPSHOT_INTERVAL);
    return () => {
      if (snapshotTimerRef.current) clearInterval(snapshotTimerRef.current);
    };
  }, [documentId, createAutoSnapshot]);

  // Save on page unload
  useEffect(() => {
    if (!documentId) return;

    const handleBeforeUnload = () => {
      if (useDocumentStore.getState().isDirty) {
        save();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [documentId, save]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (snapshotTimerRef.current) clearInterval(snapshotTimerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  return { save };
}
