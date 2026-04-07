'use client';

import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import { LogOut, Search, Sparkles } from 'lucide-react';
import { NewDocumentDialog } from './NewDocumentDialog';

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DashboardHeader({ user, searchQuery, onSearchChange }: DashboardHeaderProps) {
  const t = useTranslations();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              ladoc
            </h1>
          </div>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-medium text-gray-500">{t('dashboard.title')}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('dashboard.searchPlaceholder')}
              className="pl-9 pr-4 py-2 w-56 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          {/* New Document */}
          <NewDocumentDialog />

          {/* User */}
          <div className="flex items-center gap-2 ml-1">
            {user.image ? (
              <img src={user.image} alt="" className="w-8 h-8 rounded-full ring-2 ring-gray-100" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white flex items-center justify-center text-xs font-bold">
                {(user.name || user.email || '?')[0].toUpperCase()}
              </div>
            )}
            <span className="hidden md:inline text-sm font-medium text-gray-700">{user.name || user.email}</span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            title={t('auth.logout')}
            className="p-2 text-gray-300 hover:text-gray-500 transition-colors rounded-lg hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
