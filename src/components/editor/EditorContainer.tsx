'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useEditorStore } from '@/stores/editor-store';
import { useLadocEditor } from '@/hooks/useEditor';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useDocumentStore } from '@/stores/document-store';
import { parseTypst } from '@/lib/typst/serializer';
import { Toolbar } from './Toolbar';
import { EditorPane } from './EditorPane';
import { PreviewPane } from './PreviewPane';
import { CodeEditor } from './CodeEditor';
import { StatusBar } from './StatusBar';
import { CollaborationBar } from './CollaborationBar';

interface AwarenessUser {
  name: string;
  color: string;
}

interface EditorContainerProps {
  initialContent?: object;
  documentId?: string;
  extraExtensions?: Parameters<typeof useLadocEditor>[2];
  collabStatus?: 'connecting' | 'connected' | 'disconnected';
  collabSynced?: boolean;
  connectedUsers?: number;
  awarenessUsers?: AwarenessUser[];
}

export function EditorContainer({
  initialContent,
  documentId,
  extraExtensions,
  collabStatus,
  collabSynced,
  connectedUsers,
  awarenessUsers,
}: EditorContainerProps = {}) {
  const t = useTranslations('editor');
  const { viewMode, typstSource, setTypstSource } = useEditorStore();
  const { setDocumentId } = useDocumentStore();
  const prevViewModeRef = useRef(viewMode);
  const hasSeededCollaborationRef = useRef(false);

  const editor = useLadocEditor(t('placeholder'), initialContent, extraExtensions);

  // Set document ID for auto-save
  useEffect(() => {
    if (documentId) setDocumentId(documentId);
    return () => setDocumentId(null);
  }, [documentId, setDocumentId]);

  // Auto-save hook
  useAutoSave(documentId || null, editor);

  useEffect(() => {
    hasSeededCollaborationRef.current = false;
  }, [documentId]);

  useEffect(() => {
    if (!collabSynced || !editor || !initialContent || hasSeededCollaborationRef.current) return;

    hasSeededCollaborationRef.current = true;

    if (editor.isEmpty) {
      editor.commands.setContent(initialContent, { emitUpdate: true });
    }
  }, [collabSynced, editor, initialContent]);

  // Sync code → editor when leaving code mode (best-effort)
  useEffect(() => {
    const prev = prevViewModeRef.current;
    prevViewModeRef.current = viewMode;

    if (prev === 'code' && viewMode !== 'code' && editor && typstSource) {
      try {
        const doc = parseTypst(typstSource);
        editor.commands.setContent(doc, { emitUpdate: false });
      } catch {
        // silently ignore parse errors
      }
    }
  }, [viewMode, editor, typstSource]);

  return (
    <div className="flex h-screen flex-col">
      <Toolbar editor={editor} />
      {documentId && collabStatus && collabStatus !== 'disconnected' && (
        <CollaborationBar
          documentId={documentId}
          status={collabStatus}
          connectedUsers={connectedUsers || 0}
          awarenessUsers={awarenessUsers}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Visual mode: editor only, full width */}
        {viewMode === 'visual' && (
          <div className="flex flex-1 flex-col">
            <EditorPane editor={editor} />
          </div>
        )}

        {/* Split mode: editor left + preview right */}
        {viewMode === 'split' && (
          <>
            <div className="flex w-1/2 flex-col border-r border-gray-200">
              <EditorPane editor={editor} />
            </div>
            <div className="flex w-1/2 flex-col">
              <PreviewPane />
            </div>
          </>
        )}

        {/* Code mode: code editor only, full width */}
        {viewMode === 'code' && (
          <div className="flex flex-1 flex-col">
            <CodeEditor value={typstSource} onChange={(newCode) => setTypstSource(newCode)} />
          </div>
        )}
      </div>

      <StatusBar collabStatus={collabStatus} connectedUsers={connectedUsers} />
    </div>
  );
}
