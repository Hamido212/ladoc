'use client';

import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import { Settings, X } from 'lucide-react';
import { useEditorStore } from '@/stores/editor-store';
import { MARGIN_PRESETS } from '@/types/editor';
import type { PageSize, PageOrientation, MarginPreset } from '@/types/editor';

export function PageSettingsDialog() {
  const t = useTranslations('pageSettings');
  const { pageSettings, setPageSettings } = useEditorStore();

  const pageSizes: { value: PageSize; label: string }[] = [
    { value: 'a4', label: 'A4 (210 × 297 mm)' },
    { value: 'a5', label: 'A5 (148 × 210 mm)' },
    { value: 'letter', label: 'Letter (8.5 × 11 in)' },
    { value: 'legal', label: 'Legal (8.5 × 14 in)' },
  ];

  const marginPresets: { value: MarginPreset; label: string }[] = [
    { value: 'normal', label: t('normal') },
    { value: 'narrow', label: t('narrow') },
    { value: 'wide', label: t('wide') },
  ];

  function handleMarginPreset(preset: MarginPreset) {
    setPageSettings({ marginPreset: preset, margins: MARGIN_PRESETS[preset] });
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          title={t('title')}
          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl p-6 w-[420px] max-w-[95vw]">
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-base font-semibold text-gray-900">
              {t('title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-5">
            {/* Page Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('pageSize')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {pageSizes.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPageSettings({ pageSize: value })}
                    className={`px-3 py-2 text-sm rounded-lg border text-left transition-colors ${
                      pageSettings.pageSize === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('orientation')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['portrait', 'landscape'] as PageOrientation[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPageSettings({ orientation: value })}
                    className={`px-3 py-2 text-sm rounded-lg border flex items-center gap-2 transition-colors ${
                      pageSettings.orientation === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block border-2 border-current rounded-sm flex-shrink-0 ${
                        value === 'portrait' ? 'w-3 h-4' : 'w-4 h-3'
                      }`}
                    />
                    {value === 'portrait' ? t('portrait') : t('landscape')}
                  </button>
                ))}
              </div>
            </div>

            {/* Margins */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('margins')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {marginPresets.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleMarginPreset(value)}
                    className={`px-3 py-2 text-sm rounded-lg border text-center transition-colors ${
                      pageSettings.marginPreset === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
                  <label key={side} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-12 capitalize">
                      {t(side)}
                    </span>
                    <input
                      type="text"
                      value={pageSettings.margins[side]}
                      onChange={(e) =>
                        setPageSettings({
                          marginPreset: 'custom',
                          margins: { ...pageSettings.margins, [side]: e.target.value },
                        })
                      }
                      className="flex-1 h-7 px-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              type="button"
              className="mt-6 w-full py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('apply')}
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
