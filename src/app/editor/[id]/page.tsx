'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { EditorContainer } from '@/components/editor/EditorContainer';
import { useEditorStore } from '@/stores/editor-store';

export default function AuthenticatedEditorPage() {
  const { id } = useParams<{ id: string }>();
  const { status: sessionStatus } = useSession();
  const [document, setDocument] = useState<{
    content: object | null;
    pageSettings: object | null;
    documentMeta: object | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setPageSettings, setDocumentMeta } = useEditorStore();

  useEffect(() => {
    async function loadDocument() {
      try {
        const res = await fetch(`/api/documents/${id}`);
        if (!res.ok) {
          setError(res.status === 404 ? 'Document not found' : 'Failed to load');
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
        setError('Failed to load document');
      } finally {
        setLoading(false);
      }
    }

    loadDocument();
  }, [id, setPageSettings, setDocumentMeta]);

  if (loading || sessionStatus === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <EditorContainer
      documentId={id}
      initialContent={document?.content || undefined}
    />
  );
}
