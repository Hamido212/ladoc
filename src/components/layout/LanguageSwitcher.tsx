'use client';

import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const t = useTranslations('language');
  const [isPending, startTransition] = useTransition();

  const switchLocale = async (locale: string) => {
    startTransition(async () => {
      document.cookie = `LADOC_LOCALE=${locale};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
        disabled={isPending}
      >
        <Globe className="w-4 h-4" />
        <span>{t('label')}</span>
      </button>
      <div className="absolute right-0 mt-1 py-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <button
          onClick={() => switchLocale('de')}
          className="block w-full px-4 py-1.5 text-sm text-left hover:bg-gray-50 text-gray-700"
        >
          {t('de')}
        </button>
        <button
          onClick={() => switchLocale('en')}
          className="block w-full px-4 py-1.5 text-sm text-left hover:bg-gray-50 text-gray-700"
        >
          {t('en')}
        </button>
      </div>
    </div>
  );
}
