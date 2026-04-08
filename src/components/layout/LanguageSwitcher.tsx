'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  /** Direction the dropdown opens. Defaults to "down". */
  align?: 'down' | 'up';
  /** Visual variant. Defaults to "ghost". */
  variant?: 'ghost' | 'pill';
}

export function LanguageSwitcher({
  align = 'down',
  variant = 'ghost',
}: LanguageSwitcherProps = {}) {
  const t = useTranslations('language');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const switchLocale = (next: string) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    startTransition(() => {
      document.cookie = `LADOC_LOCALE=${next};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  const triggerClass =
    variant === 'pill'
      ? 'flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors'
      : 'flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors';

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={triggerClass}
        disabled={isPending}
        title={t('label')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{locale.toUpperCase()}</span>
      </button>
      {open && (
        <div
          className={`absolute right-0 z-50 min-w-28 rounded-xl border border-gray-200 bg-white p-1 shadow-lg ${
            align === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
          role="listbox"
        >
          <button
            type="button"
            onClick={() => switchLocale('de')}
            className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
              locale === 'de' ? 'font-medium text-blue-600' : 'text-gray-700'
            }`}
            role="option"
            aria-selected={locale === 'de'}
          >
            {t('de')}
          </button>
          <button
            type="button"
            onClick={() => switchLocale('en')}
            className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
              locale === 'en' ? 'font-medium text-blue-600' : 'text-gray-700'
            }`}
            role="option"
            aria-selected={locale === 'en'}
          >
            {t('en')}
          </button>
        </div>
      )}
    </div>
  );
}
