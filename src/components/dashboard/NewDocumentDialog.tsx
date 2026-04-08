'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Plus,
  X,
  File,
  GraduationCap,
  User,
  Mail,
  FileText,
  Presentation,
  BookOpen,
  Receipt,
  ClipboardList,
} from 'lucide-react';
import { templates } from '@/lib/templates';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  User,
  Mail,
  FileText,
  Presentation,
  BookOpen,
  Receipt,
  ClipboardList,
};

const colorMap: Record<string, string> = {
  thesis: 'from-blue-500 to-blue-600',
  cv: 'from-emerald-500 to-emerald-600',
  letter: 'from-amber-500 to-amber-600',
  report: 'from-violet-500 to-violet-600',
  presentation: 'from-rose-500 to-rose-600',
  book: 'from-cyan-500 to-cyan-600',
  invoice: 'from-orange-500 to-orange-600',
  minutes: 'from-teal-500 to-teal-600',
};

export function NewDocumentDialog() {
  const t = useTranslations();
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  async function createDocument(templateId?: string) {
    if (creating) return;
    setCreating(true);

    try {
      const template = templateId ? templates.find((t) => t.id === templateId) : undefined;

      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: template ? t(`templates.${template.nameKey}`) : undefined,
          content: template?.content,
          typstSource: undefined,
          pageSettings: template?.pageSettings,
          documentMeta: template?.documentMeta,
        }),
      });
      const doc = await res.json();
      router.push(`/editor/${doc.id}`);
    } catch {
      setCreating(false);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/25">
          <Plus className="h-4 w-4" />
          {t('dashboard.newDocument')}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[620px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-gray-900">
              {t('dashboard.createFrom')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Empty document */}
            <Dialog.Close asChild>
              <button
                onClick={() => createDocument()}
                disabled={creating}
                className="flex items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50/30 disabled:opacity-50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <File className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {t('templates.emptyDocument')}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-400">
                    {t('templates.emptyDocumentDesc')}
                  </div>
                </div>
              </button>
            </Dialog.Close>

            {/* Template cards */}
            {templates.map((template) => {
              const Icon = iconMap[template.icon] || FileText;
              const color = colorMap[template.id] || 'from-gray-500 to-gray-600';
              return (
                <Dialog.Close key={template.id} asChild>
                  <button
                    onClick={() => createDocument(template.id)}
                    disabled={creating}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 text-left transition-all hover:border-transparent hover:bg-gradient-to-br hover:from-gray-50 hover:to-white hover:shadow-md disabled:opacity-50"
                  >
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-br ${color} flex flex-shrink-0 items-center justify-center`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">
                        {t(`templates.${template.nameKey}`)}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-gray-400">
                        {t(`templates.${template.descriptionKey}`)}
                      </div>
                    </div>
                  </button>
                </Dialog.Close>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
