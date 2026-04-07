export type ViewMode = 'visual' | 'code' | 'split';

export type PageSize = 'a4' | 'a5' | 'letter' | 'legal';

export type PageOrientation = 'portrait' | 'landscape';

export type MarginPreset = 'normal' | 'narrow' | 'wide' | 'custom';

export interface PageSettings {
  pageSize: PageSize;
  orientation: PageOrientation;
  marginPreset: MarginPreset;
  margins: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
}

export interface DocumentMeta {
  title: string;
  fontFamily: string;
  fontSize: string;
  preamble: string;
}

export interface EditorStats {
  words: number;
  characters: number;
  pages: number;
}

export const PAGE_SIZES: Record<PageSize, { width: string; height: string }> = {
  a4: { width: '210mm', height: '297mm' },
  a5: { width: '148mm', height: '210mm' },
  letter: { width: '8.5in', height: '11in' },
  legal: { width: '8.5in', height: '14in' },
};

export const MARGIN_PRESETS: Record<MarginPreset, { top: string; bottom: string; left: string; right: string }> = {
  normal: { top: '2.5cm', bottom: '2.5cm', left: '2.5cm', right: '2.5cm' },
  narrow: { top: '1.27cm', bottom: '1.27cm', left: '1.27cm', right: '1.27cm' },
  wide: { top: '2.54cm', bottom: '2.54cm', left: '3.18cm', right: '3.18cm' },
  custom: { top: '2.5cm', bottom: '2.5cm', left: '2.5cm', right: '2.5cm' },
};

export const DEFAULT_PAGE_SETTINGS: PageSettings = {
  pageSize: 'a4',
  orientation: 'portrait',
  marginPreset: 'normal',
  margins: MARGIN_PRESETS.normal,
};

export const DEFAULT_DOCUMENT_META: DocumentMeta = {
  title: 'Untitled Document',
  fontFamily: 'serif',
  fontSize: '11pt',
  preamble: '',
};
