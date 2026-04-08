'use client';

interface WorkerReadyMessage {
  type: 'ready';
}

interface WorkerPdfMessage {
  type: 'pdfCompiled';
  id: number;
  pdf: ArrayBuffer;
}

interface WorkerErrorMessage {
  type: 'error';
  id: number;
  error: string;
}

type WorkerMessage = WorkerReadyMessage | WorkerPdfMessage | WorkerErrorMessage;

export function exportTypstPdf(source: string) {
  return new Promise<Blob>((resolve, reject) => {
    const worker = new Worker(new URL('./compiler.worker.ts', import.meta.url), { type: 'module' });
    const requestId = Date.now();
    let settled = false;

    const cleanup = () => {
      worker.terminate();
    };

    const fail = (error: string) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(error));
    };

    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const data = event.data;

      switch (data.type) {
        case 'ready':
          worker.postMessage({ type: 'compilePdf', id: requestId, source });
          break;
        case 'pdfCompiled':
          if (data.id !== requestId) return;
          if (settled) return;
          settled = true;
          cleanup();
          resolve(new Blob([data.pdf], { type: 'application/pdf' }));
          break;
        case 'error':
          if (data.id !== -1 && data.id !== requestId) return;
          fail(data.error);
          break;
      }
    };

    worker.onerror = () => {
      fail('Failed to export PDF');
    };

    worker.postMessage({ type: 'init' });
  });
}
