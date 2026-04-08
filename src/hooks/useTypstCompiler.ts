'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditorStore } from '@/stores/editor-store';

export function useTypstCompiler() {
  const workerRef = useRef<Worker | null>(null);
  const compileIdRef = useRef(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isReadyRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const { setSvgContent, setIsCompiling, setCompilationError, setStats } = useEditorStore();

  // Initialize the web worker
  useEffect(() => {
    const worker = new Worker(new URL('@/lib/typst/compiler.worker.ts', import.meta.url), {
      type: 'module',
    });

    worker.onmessage = (event) => {
      const data = event.data;

      switch (data.type) {
        case 'ready':
          isReadyRef.current = true;
          setIsReady(true);
          break;

        case 'compiled':
          setSvgContent(data.svg);
          setStats({ pages: data.pages });
          setIsCompiling(false);
          setCompilationError(null);
          break;

        case 'error':
          if (data.id >= 0) {
            setCompilationError(data.error);
            setIsCompiling(false);
          }
          break;
      }
    };

    worker.postMessage({ type: 'init' });
    workerRef.current = worker;

    return () => {
      worker.terminate();
      workerRef.current = null;
      isReadyRef.current = false;
      setIsReady(false);
    };
  }, [setSvgContent, setIsCompiling, setCompilationError, setStats]);

  // Compile function with debouncing (300ms)
  const compile = useCallback(
    (source: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        if (!workerRef.current || !isReadyRef.current) return;

        const id = ++compileIdRef.current;
        setIsCompiling(true);

        workerRef.current.postMessage({
          type: 'compile',
          id,
          source,
        });
      }, 300);
    },
    [setIsCompiling]
  );

  // Immediate compile (no debounce)
  const compileNow = useCallback(
    (source: string) => {
      if (!workerRef.current || !isReadyRef.current) return;

      const id = ++compileIdRef.current;
      setIsCompiling(true);

      workerRef.current.postMessage({
        type: 'compile',
        id,
        source,
      });
    },
    [setIsCompiling]
  );

  return {
    compile,
    compileNow,
    isReady,
  };
}
