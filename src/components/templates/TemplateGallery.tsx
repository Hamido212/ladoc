'use client';

import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import {
  LayoutTemplate,
  X,
  GraduationCap,
  User,
  Mail,
  FileText,
  Presentation,
  BookOpen,
  File,
  Receipt,
  ClipboardList,
} from 'lucide-react';
import { templates, type Template } from '@/lib/templates';
import { useEditorStore } from '@/stores/editor-store';
import { MARGIN_PRESETS } from '@/types/editor';
import type { Editor } from '@tiptap/react';

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

interface TemplateGalleryProps {
  editor: Editor | null;
}

export function TemplateGallery({ editor }: TemplateGalleryProps) {
  const t = useTranslations('templates');
  const { setPageSettings, setDocumentMeta } = useEditorStore();

  function applyTemplate(template: Template) {
    if (!editor) return;

    // Apply page settings
    if (template.pageSettings) {
      const preset = template.pageSettings.marginPreset || 'normal';
      setPageSettings({
        ...template.pageSettings,
        margins: template.pageSettings.margins || MARGIN_PRESETS[preset],
      });
    }

    // Apply document meta
    if (template.documentMeta) {
      setDocumentMeta(template.documentMeta);
    }

    // Set editor content
    editor.commands.setContent(template.content, { emitUpdate: false });
    editor.commands.focus('start');
  }

  function applyEmpty() {
    if (!editor) return;
    editor.commands.clearContent();
    editor.commands.focus('start');
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          title={t('title')}
          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <LayoutTemplate className="w-4 h-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl p-6 w-[560px] max-w-[95vw] max-h-[85vh] overflow-y-auto">
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

          <div className="grid grid-cols-2 gap-3">
            {/* Empty document */}
            <Dialog.Close asChild>
              <button
                type="button"
                onClick={applyEmpty}
                className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left"
              >
                <File className="w-8 h-8 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {t('emptyDocument')}
                  </div>
                </div>
              </button>
            </Dialog.Close>

            {/* Template cards */}
            {templates.map((template) => {
              const Icon = iconMap[template.icon] || FileText;
              return (
                <Dialog.Close key={template.id} asChild>
                  <button
                    type="button"
                    onClick={() => applyTemplate(template)}
                    className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-left"
                  >
                    <Icon className="w-8 h-8 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {t(template.nameKey)}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {t(template.descriptionKey)}
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
