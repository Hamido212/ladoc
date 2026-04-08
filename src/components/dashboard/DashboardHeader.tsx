'use client';

import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import { LogOut, Search, Sparkles } from 'lucide-react';
import { NewDocumentDialog } from './NewDocumentDialog';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'active' | 'deleted';
  onViewModeChange: (mode: 'active' | 'deleted') => void;
}

export function DashboardHeader({
  user,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: DashboardHeaderProps) {
  const t = useTranslations();

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-col gap-3 px-6 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h1 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-lg font-bold text-transparent">
              ladoc
            </h1>
          </div>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-medium text-gray-500">{t('dashboard.title')}</span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <div className="flex items-center rounded-xl border border-gray-100 bg-gray-50 p-1">
            <button
              type="button"
              onClick={() => onViewModeChange('active')}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                viewMode === 'active'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('dashboard.allDocs')}
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('deleted')}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                viewMode === 'deleted'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('dashboard.trash')}
            </button>
          </div>

          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('dashboard.searchPlaceholder')}
              className="w-56 rounded-xl border border-gray-100 bg-gray-50 py-2 pr-4 pl-9 text-sm transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* New Document */}
          {viewMode === 'active' && <NewDocumentDialog />}

          {/* Language */}
          <LanguageSwitcher />

          {/* User */}
          <div className="ml-1 flex items-center gap-2">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="" className="h-8 w-8 rounded-full ring-2 ring-gray-100" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-bold text-white">
                {(user.name || user.email || '?')[0].toUpperCase()}
              </div>
            )}
            <span className="hidden text-sm font-medium text-gray-700 md:inline">
              {user.name || user.email}
            </span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            title={t('auth.logout')}
            className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-50 hover:text-gray-500"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
