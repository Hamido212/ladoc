'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from './DashboardHeader';
import { DocumentList } from './DocumentList';

interface DocumentItem {
  id: string;
  title: string;
  updatedAt: string | Date;
  deletedAt?: string | Date | null;
}

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  documents: DocumentItem[];
  deletedDocuments: DocumentItem[];
}

export function DashboardContent({ user, documents, deletedDocuments }: DashboardContentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'active' | 'deleted'>('active');
  const [activeDocuments, setActiveDocuments] = useState(documents);
  const [trashedDocuments, setTrashedDocuments] = useState(deletedDocuments);

  async function handleDelete(id: string) {
    const documentToDelete = activeDocuments.find((document) => document.id === id);
    if (!documentToDelete) return;

    const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
    if (!res.ok) return;

    const deletedAt = new Date().toISOString();
    setActiveDocuments((prev) => prev.filter((document) => document.id !== id));
    setTrashedDocuments((prev) => [{ ...documentToDelete, deletedAt }, ...prev]);
    router.refresh();
  }

  async function handleRestore(id: string) {
    const res = await fetch(`/api/documents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restore: true }),
    });

    if (!res.ok) return;

    const restoredDocument = await res.json();
    setTrashedDocuments((prev) => prev.filter((document) => document.id !== id));
    setActiveDocuments((prev) => [
      {
        id: restoredDocument.id,
        title: restoredDocument.title,
        updatedAt: restoredDocument.updatedAt,
      },
      ...prev,
    ]);
    setViewMode('active');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardHeader
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <DocumentList
          documents={viewMode === 'active' ? activeDocuments : trashedDocuments}
          searchQuery={searchQuery}
          mode={viewMode}
          onDelete={handleDelete}
          onRestore={handleRestore}
        />
      </main>
    </div>
  );
}
