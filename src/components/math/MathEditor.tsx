'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { MathPalette } from './MathPalette';

interface MathEditorProps {
  initialFormula?: string;
  display?: boolean;
  onInsert: (formula: string, display: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MathEditor({ initialFormula = '', display: initialDisplay = false, onInsert, open, onOpenChange }: MathEditorProps) {
  const t = useTranslations('math');
  const [formula, setFormula] = useState(initialFormula);
  const [isDisplay, setIsDisplay] = useState(initialDisplay);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setFormula(initialFormula);
      setIsDisplay(initialDisplay);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, initialFormula, initialDisplay]);

  const handleInsertSymbol = useCallback((symbol: string) => {
    const textarea = inputRef.current;
    if (!textarea) {
      setFormula(prev => prev + symbol);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newFormula = formula.slice(0, start) + symbol + formula.slice(end);
    setFormula(newFormula);
    // Restore cursor position after symbol
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + symbol.length;
      textarea.focus();
    }, 0);
  }, [formula]);

  const handleSubmit = useCallback(() => {
    if (formula.trim()) {
      onInsert(formula.trim(), isDisplay);
      onOpenChange(false);
    }
  }, [formula, isDisplay, onInsert, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl p-6 w-[600px] max-w-[95vw] max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-base font-semibold text-gray-900">
              {t('title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Formula input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('formula')}
            </label>
            <textarea
              ref={inputRef}
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleSubmit();
                }
              }}
              placeholder={t('formulaPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          {/* Preview */}
          {formula.trim() && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
              <div className="text-xs text-gray-500 mb-1">{t('preview')}</div>
              <div className="font-mono text-sm text-center py-2">
                {isDisplay ? `$ ${formula} $` : `$${formula}$`}
              </div>
            </div>
          )}

          {/* Display mode toggle */}
          <div className="mb-4 flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isDisplay}
                onChange={(e) => setIsDisplay(e.target.checked)}
                className="rounded border-gray-300"
              />
              {t('displayMode')}
            </label>
            <span className="text-xs text-gray-400">
              {isDisplay ? t('displayModeDesc') : t('inlineModeDesc')}
            </span>
          </div>

          {/* Symbol palette */}
          <MathPalette onInsert={handleInsertSymbol} />

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                {t('cancel')}
              </button>
            </Dialog.Close>
            <button
              onClick={handleSubmit}
              disabled={!formula.trim()}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {t('insert')}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
