'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Collaboration from '@tiptap/extension-collaboration';
import { EditorContainer } from '@/components/editor/EditorContainer';
import { useEditorStore } from '@/stores/editor-store';
import { useCollaboration } from '@/hooks/useCollaboration';
import SafeCollaborationCursor from '@/lib/editor/extensions/safe-collaboration-cursor';

export default function AuthenticatedEditorPage() {
  const t = useTranslations('editor');
  const { id } = useParams<{ id: string }>();
  const { data: session, status: sessionStatus } = useSession();
  const [document, setDocument] = useState<{
    content: object | null;
    pageSettings: object | null;
    documentMeta: object | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [collaborationReady, setCollaborationReady] = useState(false);
  const { setPageSettings, setDocumentMeta } = useEditorStore();

  const {
    ydoc,
    provider,
    status: collabStatus,
    hasSynced,
    userColor,
    connectedUsers,
    awarenessUsers,
  } = useCollaboration({
    documentId: id || null,
    token: collabToken || undefined,
    userName: session?.user?.name || session?.user?.email || 'Anonymous',
  });

  const collaborationFragment = useMemo(() => {
    if (!ydoc) return null;
    return ydoc.getXmlFragment('content');
  }, [ydoc]);

  const collaborationExtensions = useMemo(() => {
    if (!provider || !collaborationFragment) return undefined;

    return [
      Collaboration.configure({
        fragment: collaborationFragment,
        provider,
      }),
      SafeCollaborationCursor.configure({
        provider,
        user: {
          name: session?.user?.name || session?.user?.email || 'Anonymous',
          color: userColor,
        },
      }),
    ];
  }, [collaborationFragment, provider, session?.user?.email, session?.user?.name, userColor]);

  useEffect(() => {
    async function loadDocument() {
      try {
        const res = await fetch(`/api/documents/${id}`);
        if (!res.ok) {
          setError(res.status === 404 ? t('documentNotFound') : t('loadFailed'));
          return;
        }

        const doc = await res.json();
        setDocument(doc);

        if (doc.pageSettings) {
          setPageSettings(doc.pageSettings);
        }

        if (doc.documentMeta) {
          setDocumentMeta(doc.documentMeta);
        }
      } catch {
        setError(t('loadFailed'));
      } finally {
        setLoading(false);
      }
    }

    loadDocument();
  }, [id, setPageSettings, setDocumentMeta, t]);

  useEffect(() => {
    if (!id || sessionStatus !== 'authenticated') return;

    let cancelled = false;

    setCollaborationReady(false);

    async function loadCollaborationToken() {
      try {
        const res = await fetch(`/api/documents/${id}/collaboration-token`);
        if (!res.ok) {
          if (!cancelled) {
            setCollabToken(null);
            setCollaborationReady(true);
          }
          return;
        }

        const data = await res.json();
        if (!cancelled) {
          setCollabToken(data.token || null);
          setCollaborationReady(true);
        }
      } catch {
        if (!cancelled) {
          setCollabToken(null);
          setCollaborationReady(true);
        }
      }
    }

    loadCollaborationToken();

    return () => {
      cancelled = true;
    };
  }, [id, sessionStatus]);

  if (
    loading ||
    sessionStatus === 'loading' ||
    (sessionStatus === 'authenticated' && !collaborationReady) ||
    (collabToken && (!provider || !collaborationExtensions))
  ) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">{t('loading')}</div>
    );
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <EditorContainer
      key={provider ? `collab-${id}` : `local-${id}`}
      documentId={id}
      initialContent={document?.content || undefined}
      extraExtensions={collaborationExtensions}
      collabStatus={provider ? collabStatus : undefined}
      collabSynced={provider ? hasSynced : undefined}
      connectedUsers={provider ? connectedUsers : undefined}
      awarenessUsers={provider ? awarenessUsers : undefined}
    />
  );
}
