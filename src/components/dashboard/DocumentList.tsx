'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FileText, Trash2, Plus, Clock, RotateCcw } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  updatedAt: string | Date;
  deletedAt?: string | Date | null;
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
  documents,
  searchQuery = '',
  mode,
  onDelete,
  onRestore,
}: {
  documents: DocumentItem[];
  searchQuery?: string;
  mode: 'active' | 'deleted';
  onDelete: (id: string) => Promise<void>;
  onRestore: (id: string) => Promise<void>;
}) {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const router = useRouter();

  const filtered = searchQuery
    ? documents.filter((d) => d.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : documents;

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm(t('confirmDelete'))) return;
    await onDelete(id);
  }

  async function handleRestore(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm(t('confirmRestore'))) return;
    await onRestore(id);
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
      <div className="py-24 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <FileText className="h-8 w-8 text-gray-300" />
        </div>
        <h2 className="mb-1 text-lg font-semibold text-gray-700">
          {mode === 'active' ? t('noDocuments') : t('noDeletedDocuments')}
        </h2>
        <p className="mb-8 text-sm text-gray-400">
          {mode === 'active' ? t('noDocumentsDesc') : t('noDeletedDocumentsDesc')}
        </p>
        {mode === 'active' && (
          <button
            onClick={handleNewDocument}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Plus className="h-4 w-4" />
            {t('newDocument')}
          </button>
        )}
      </div>
    );
  }

  if (filtered.length === 0 && searchQuery) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-gray-400">{t('noSearchResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((doc, i) => {
        const colorClass = CARD_COLORS[i % CARD_COLORS.length];
        return (
          <div
            key={doc.id}
            onClick={() => {
              if (mode === 'active') router.push(`/editor/${doc.id}`);
            }}
            className={`group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-200 ${
              mode === 'active'
                ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
                : 'border-dashed'
            }`}
          >
            {/* Color accent bar */}
            <div className={`h-1.5 bg-gradient-to-r ${colorClass}`} />
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-lg bg-gradient-to-br ${colorClass} flex flex-shrink-0 items-center justify-center`}
                  >
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="truncate text-sm font-semibold text-gray-800">{doc.title}</h3>
                </div>
                {mode === 'active' ? (
                  <button
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="rounded-lg p-1.5 text-gray-200 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                    title={t('delete')}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleRestore(doc.id, e)}
                    className="rounded-lg p-1.5 text-gray-300 opacity-100 transition-all hover:bg-emerald-50 hover:text-emerald-600"
                    title={t('restore')}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                <span>
                  {mode === 'active' ? t('lastEdited') : t('deletedAt')}:{' '}
                  {new Date(
                    mode === 'active' ? doc.updatedAt : doc.deletedAt || doc.updatedAt
                  ).toLocaleDateString(locale, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
