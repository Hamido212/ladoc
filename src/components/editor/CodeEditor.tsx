'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightSpecialChars,
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, readOnly = false }: CodeEditorProps) {
  const t = useTranslations('editor');
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);

  // Keep the callback ref up to date
  onChangeRef.current = onChange;

  // Initialize CodeMirror
  useEffect(() => {
    if (!containerRef.current) return;

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      highlightSpecialChars(),
      history(),
      syntaxHighlighting(defaultHighlightStyle),
      highlightSelectionMatches(),
      markdown(),
      keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
      EditorView.theme({
        '&': {
          height: '100%',
          fontSize: '13px',
        },
        '.cm-scroller': {
          fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
        },
        '.cm-content': {
          padding: '12px 0',
        },
        '.cm-line': {
          padding: '0 12px',
        },
      }),
      EditorView.lineWrapping,
    ];

    if (!readOnly && onChange) {
      extensions.push(
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChangeRef.current?.(newValue);
          }
        })
      );
    }

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true));
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readOnly]);

  // Update content when value changes externally
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentValue = view.state.doc.toString();
    if (currentValue !== value) {
      view.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: value,
        },
      });
    }
  }, [value]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b border-gray-200 bg-white px-3 py-1.5">
        <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
          {t('typstCode')}
        </span>
      </div>
      <div ref={containerRef} className="flex-1 overflow-hidden" />
    </div>
  );
}
