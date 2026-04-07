import { create } from 'zustand';
import type {
  ViewMode,
  PageSettings,
  DocumentMeta,
  EditorStats,
} from '@/types/editor';
import { DEFAULT_PAGE_SETTINGS, DEFAULT_DOCUMENT_META } from '@/types/editor';

interface EditorState {
  // View
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Typst output
  typstSource: string;
  setTypstSource: (source: string) => void;

  // SVG preview
  svgContent: string;
  setSvgContent: (svg: string) => void;

  // Compilation state
  isCompiling: boolean;
  setIsCompiling: (compiling: boolean) => void;
  compilationError: string | null;
  setCompilationError: (error: string | null) => void;

  // Page settings
  pageSettings: PageSettings;
  setPageSettings: (settings: Partial<PageSettings>) => void;

  // Document meta
  documentMeta: DocumentMeta;
  setDocumentMeta: (meta: Partial<DocumentMeta>) => void;

  // Stats
  stats: EditorStats;
  setStats: (stats: Partial<EditorStats>) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  viewMode: 'visual',
  setViewMode: (mode) => set({ viewMode: mode }),

  typstSource: '',
  setTypstSource: (source) => set({ typstSource: source }),

  svgContent: '',
  setSvgContent: (svg) => set({ svgContent: svg }),

  isCompiling: false,
  setIsCompiling: (compiling) => set({ isCompiling: compiling }),
  compilationError: null,
  setCompilationError: (error) => set({ compilationError: error }),

  pageSettings: DEFAULT_PAGE_SETTINGS,
  setPageSettings: (settings) =>
    set((state) => ({
      pageSettings: { ...state.pageSettings, ...settings },
    })),

  documentMeta: DEFAULT_DOCUMENT_META,
  setDocumentMeta: (meta) =>
    set((state) => ({
      documentMeta: { ...state.documentMeta, ...meta },
    })),

  stats: { words: 0, characters: 0, pages: 0 },
  setStats: (stats) =>
    set((state) => ({
      stats: { ...state.stats, ...stats },
    })),
}));
