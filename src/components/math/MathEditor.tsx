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

export function MathEditor({
  initialFormula = '',
  display: initialDisplay = false,
  onInsert,
  open,
  onOpenChange,
}: MathEditorProps) {
  const t = useTranslations('math');
  const [formula, setFormula] = useState(initialFormula);
  const [isDisplay, setIsDisplay] = useState(initialDisplay);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;

    const focusTimer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(focusTimer);
  }, [open]);

  const handleInsertSymbol = useCallback(
    (symbol: string) => {
      const textarea = inputRef.current;
      if (!textarea) {
        setFormula((prev) => prev + symbol);
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
    },
    [formula]
  );

  const handleSubmit = useCallback(() => {
    if (formula.trim()) {
      onInsert(formula.trim(), isDisplay);
      setFormula(initialFormula);
      setIsDisplay(initialDisplay);
      onOpenChange(false);
    }
  }, [formula, isDisplay, initialDisplay, initialFormula, onInsert, onOpenChange]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setFormula(initialFormula);
        setIsDisplay(initialDisplay);
      }

      onOpenChange(nextOpen);
    },
    [initialDisplay, initialFormula, onOpenChange]
  );

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[600px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-gray-900">
              {t('title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Formula input */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">{t('formula')}</label>
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
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={3}
            />
          </div>

          {/* Preview */}
          {formula.trim() && (
            <div className="mb-4 rounded-lg border bg-gray-50 p-3">
              <div className="mb-1 text-xs text-gray-500">{t('preview')}</div>
              <div className="py-2 text-center font-mono text-sm">
                {isDisplay ? `$ ${formula} $` : `$${formula}$`}
              </div>
            </div>
          )}

          {/* Display mode toggle */}
          <div className="mb-4 flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
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
          <div className="mt-4 flex justify-end gap-2 border-t pt-4">
            <Dialog.Close asChild>
              <button className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                {t('cancel')}
              </button>
            </Dialog.Close>
            <button
              onClick={handleSubmit}
              disabled={!formula.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {t('insert')}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
