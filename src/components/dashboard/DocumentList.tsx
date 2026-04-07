'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FileText, Trash2, Plus, Clock } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  updatedAt: string | Date;
}

const CARD_COLORS = [
  'from-blue-500 to-blue-600',
  'from-violet-500 to-violet-600',
  'from-emerald-500 to-emerald-600',
  'from-amber-500 to-amber-600',
  'from-rose-500 to-rose-600',
  'from-cyan-500 to-cyan-600',
];

export function DocumentList({
  documents: initial,
  searchQuery = '',
}: {
  documents: DocumentItem[];
  searchQuery?: string;
}) {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [documents, setDocuments] = useState(initial);

  const filtered = searchQuery
    ? documents.filter((d) =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : documents;

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm(t('confirmDelete'))) return;

    await fetch(`/api/documents/${id}`, { method: 'DELETE' });
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  async function handleNewDocument() {
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const doc = await res.json();
    router.push(`/editor/${doc.id}`);
  }

  if (filtered.length === 0 && !searchQuery) {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
          <FileText className="w-8 h-8 text-gray-300" />
        </div>
        <h2 className="text-lg font-semibold text-gray-700 mb-1">{t('noDocuments')}</h2>
        <p className="text-sm text-gray-400 mb-8">{t('noDocumentsDesc')}</p>
        <button
          onClick={handleNewDocument}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          {t('newDocument')}
        </button>
      </div>
    );
  }

  if (filtered.length === 0 && searchQuery) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-gray-400">Keine Dokumente gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((doc, i) => {
        const colorClass = CARD_COLORS[i % CARD_COLORS.length];
        return (
          <div
            key={doc.id}
            onClick={() => router.push(`/editor/${doc.id}`)}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            {/* Color accent bar */}
            <div className={`h-1.5 bg-gradient-to-r ${colorClass}`} />
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 truncate text-sm">{doc.title}</h3>
                </div>
                <button
                  onClick={(e) => handleDelete(doc.id, e)}
                  className="p-1.5 text-gray-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-50"
                  title={t('delete')}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{t('lastEdited')}: {new Date(doc.updatedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
