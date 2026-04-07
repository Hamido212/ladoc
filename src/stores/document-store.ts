import { create } from 'zustand';

interface DocumentState {
  documentId: string | null;
  isSaving: boolean;
  lastSavedAt: Date | null;
  isDirty: boolean;
  saveError: string | null;

  setDocumentId: (id: string | null) => void;
  setSaving: (saving: boolean) => void;
  setLastSavedAt: (date: Date) => void;
  setDirty: (dirty: boolean) => void;
  setSaveError: (error: string | null) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documentId: null,
  isSaving: false,
  lastSavedAt: null,
  isDirty: false,
  saveError: null,

  setDocumentId: (id) => set({ documentId: id }),
  setSaving: (saving) => set({ isSaving: saving }),
  setLastSavedAt: (date) => set({ lastSavedAt: date, isDirty: false, saveError: null }),
  setDirty: (dirty) => set({ isDirty: dirty }),
  setSaveError: (error) => set({ saveError: error, isSaving: false }),
}));
