import type { JSONContent } from '@tiptap/react';
import type { PageSettings, DocumentMeta } from '@/types/editor';

export interface Template {
  id: string;
  nameKey: string; // i18n key
  descriptionKey: string; // i18n key
  icon: string; // Lucide icon name
  category: 'academic' | 'professional' | 'general';
  pageSettings?: Partial<PageSettings>;
  documentMeta?: Partial<DocumentMeta>;
  content: JSONContent;
}
