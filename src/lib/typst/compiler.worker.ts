/**
 * Typst Compilation Web Worker
 *
 * Runs the Typst WASM compiler in a separate thread to keep the UI responsive.
 * Receives Typst source strings, compiles them, and returns SVG output.
 * Loads additional fonts (Noto Sans, Noto Serif) from CDN for rich font support.
 */

/// <reference lib="webworker" />

declare const self: DedicatedWorkerGlobalScope;

interface CompileRequest {
  type: 'compile';
  id: number;
  source: string;
}

interface InitRequest {
  type: 'init';
}

interface CompileResponse {
  type: 'compiled';
  id: number;
  svg: string;
  pages: number;
}

interface ErrorResponse {
  type: 'error';
  id: number;
  error: string;
}

interface ReadyResponse {
  type: 'ready';
}

type WorkerRequest = CompileRequest | InitRequest;
type WorkerResponse = CompileResponse | ErrorResponse | ReadyResponse;

/**
 * Font URLs from fontsource CDN (jsdelivr).
 * These provide Noto Sans and Noto Serif which are used as fallbacks
 * for common CSS fonts (Arial, Verdana, Georgia, etc.) in the Typst preview.
 *
 * Built-in fonts (no loading needed):
 * - Linux Libertine (default serif)
 * - DejaVu Sans Mono (monospace)
 * - New Computer Modern (math)
 */
const FONT_URLS = [
  // Noto Sans — used for sans-serif, Arial, Verdana
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-400-normal.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-700-normal.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-400-italic.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-700-italic.woff2',
  // Noto Serif — used for Georgia
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif@latest/latin-400-normal.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif@latest/latin-700-normal.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif@latest/latin-400-italic.woff2',
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif@latest/latin-700-italic.woff2',
];

let typstCompiler: unknown = null;
let isInitialized = false;

async function initCompiler() {
  try {
    // Dynamic import of typst.ts WASM module
    const { $typst, loadFonts } = await import('@myriaddreamin/typst.ts');

    // Set the path where WASM and font assets are located
    const origin = self.location.origin;
    $typst.setCompilerInitOptions({
      getModule: () => `${origin}/wasm/typst_ts_web_compiler_bg.wasm`,
      beforeBuild: [
        loadFonts(FONT_URLS),
      ],
    });
    $typst.setRendererInitOptions({
      getModule: () => `${origin}/wasm/typst_ts_renderer_bg.wasm`,
    });

    typstCompiler = $typst;
    isInitialized = true;

    const response: ReadyResponse = { type: 'ready' };
    self.postMessage(response);
  } catch (err) {
    const response: ErrorResponse = {
      type: 'error',
      id: -1,
      error: `Failed to initialize Typst compiler: ${err}`,
    };
    self.postMessage(response);
  }
}

async function compile(id: number, source: string) {
  if (!isInitialized || !typstCompiler) {
    const response: ErrorResponse = {
      type: 'error',
      id,
      error: 'Compiler not initialized',
    };
    self.postMessage(response);
    return;
  }

  try {
    const $typst = typstCompiler as {
      svg: (opts: { mainContent: string }) => Promise<string>;
    };

    const svg = await $typst.svg({ mainContent: source });

    // Count pages by looking at SVG page markers
    const pageCount = (svg.match(/<g[^>]*class="typst-page"/g) || []).length || 1;

    const response: CompileResponse = {
      type: 'compiled',
      id,
      svg,
      pages: pageCount,
    };
    self.postMessage(response);
  } catch (err) {
    const response: ErrorResponse = {
      type: 'error',
      id,
      error: `Compilation error: ${err}`,
    };
    self.postMessage(response);
  }
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const { data } = event;

  switch (data.type) {
    case 'init':
      initCompiler();
      break;
    case 'compile':
      compile(data.id, data.source);
      break;
  }
};

export type { CompileRequest, CompileResponse, ErrorResponse, ReadyResponse, WorkerRequest, WorkerResponse };
