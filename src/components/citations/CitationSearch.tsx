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

function generateBibtex(result: SearchResult): string {
  const authors = result.authors.join(' and ');
  return `@article{${result.citeKey},
  title = {${result.title}},
  author = {${authors}},
  year = {${result.year}},
  ${result.journal ? `journal = {${result.journal}},` : ''}
  ${result.doi ? `doi = {${result.doi}},` : ''}
}`;
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
        const year = ((item['published-print'] as { 'date-parts'?: number[][] })?.['date-parts']?.[0]?.[0]) || 0;
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

  const insertCitation = useCallback((result: SearchResult) => {
    if (!editor) return;
    const label = `${result.authors[0]?.split(' ').pop() || 'Unknown'} ${result.year}`;
    editor.chain().focus().insertCitation(result.citeKey, label).run();
    setOpen(false);
  }, [editor]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
          title={t('title')}
        >
          <BookOpen className="w-4 h-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl p-6 w-[550px] max-w-[95vw] max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-base font-semibold text-gray-900">
              {t('title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Search bar */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={search}
              disabled={loading || !query.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {t('search')}
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {error && (
              <div className="text-sm text-red-500 text-center py-4">{error}</div>
            )}
            {!loading && results.length === 0 && !error && (
              <div className="text-sm text-gray-400 text-center py-8">
                {t('searchHint')}
              </div>
            )}
            <div className="space-y-2">
              {results.map((result, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 leading-snug">
                        {result.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {result.authors.slice(0, 3).join(', ')}
                        {result.authors.length > 3 && ' et al.'}
                        {result.year ? ` (${result.year})` : ''}
                      </p>
                      {result.journal && (
                        <p className="text-xs text-gray-400 italic mt-0.5">{result.journal}</p>
                      )}
                    </div>
                    <button
                      onClick={() => insertCitation(result)}
                      className="p-1.5 rounded-md text-blue-600 hover:bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      title={t('insertCitation')}
                    >
                      <Plus className="w-4 h-4" />
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
