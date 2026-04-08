'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import { BookOpen, X, Search, Plus, Loader2 } from 'lucide-react';
import type { Editor } from '@tiptap/react';

interface SearchResult {
  doi: string;
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  citeKey: string;
}

interface CitationSearchProps {
  editor: Editor | null;
}

function generateCiteKey(result: SearchResult): string {
  const firstAuthor = result.authors[0]?.split(' ').pop()?.toLowerCase() || 'unknown';
  return `${firstAuthor}${result.year}`;
}

export function CitationSearch({ editor }: CitationSearchProps) {
  const t = useTranslations('citations');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);

    try {
      // Search CrossRef API
      const encodedQuery = encodeURIComponent(query);
      const res = await fetch(
        `https://api.crossref.org/works?query=${encodedQuery}&rows=10&select=DOI,title,author,published-print,container-title`,
        { headers: { 'User-Agent': 'ladoc/1.0 (mailto:contact@ladoc.app)' } }
      );

      if (!res.ok) throw new Error('Search failed');

      const data = await res.json();
      const items = data.message?.items || [];

      const mapped: SearchResult[] = items.map((item: Record<string, unknown>) => {
        const authors = ((item.author as Array<{ given?: string; family?: string }>) || []).map(
          (a) => `${a.given || ''} ${a.family || ''}`.trim()
        );
        const year =
          (item['published-print'] as { 'date-parts'?: number[][] })?.['date-parts']?.[0]?.[0] || 0;
        const title = ((item.title as string[]) || ['Untitled'])[0];
        const journal = ((item['container-title'] as string[]) || [])[0] || '';
        const doi = (item.DOI as string) || '';

        const result: SearchResult = { doi, title, authors, year, journal, citeKey: '' };
        result.citeKey = generateCiteKey(result);
        return result;
      });

      setResults(mapped);
    } catch {
      setError(t('searchError'));
    } finally {
      setLoading(false);
    }
  }, [query, t]);

  const insertCitation = useCallback(
    (result: SearchResult) => {
      if (!editor) return;
      const label = `${result.authors[0]?.split(' ').pop() || 'Unknown'} ${result.year}`;
      editor.chain().focus().insertCitation(result.citeKey, label).run();
      setOpen(false);
    },
    [editor]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="cursor-pointer rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          title={t('title')}
        >
          <BookOpen className="h-4 w-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex max-h-[80vh] w-[550px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-gray-900">
              {t('title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Search bar */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
                placeholder={t('searchPlaceholder')}
                className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={search}
              disabled={loading || !query.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {t('search')}
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {error && <div className="py-4 text-center text-sm text-red-500">{error}</div>}
            {!loading && results.length === 0 && !error && (
              <div className="py-8 text-center text-sm text-gray-400">{t('searchHint')}</div>
            )}
            <div className="space-y-2">
              {results.map((result, i) => (
                <div
                  key={i}
                  className="group rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug font-medium text-gray-900">
                        {result.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {result.authors.slice(0, 3).join(', ')}
                        {result.authors.length > 3 && ' et al.'}
                        {result.year ? ` (${result.year})` : ''}
                      </p>
                      {result.journal && (
                        <p className="mt-0.5 text-xs text-gray-400 italic">{result.journal}</p>
                      )}
                    </div>
                    <button
                      onClick={() => insertCitation(result)}
                      className="flex-shrink-0 rounded-md p-1.5 text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-blue-100"
                      title={t('insertCitation')}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
