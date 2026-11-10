import type { DataResult } from './types';

export const DEFAULT_TIMEOUT_MS = 8000;

export async function fetchJson(url: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<unknown> {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

/**
 * Runs a live loader; on any failure returns the static snapshot flagged as fallback.
 * The error message is kept on the result so the UI can surface it.
 */
export async function withFallback<T>(
  load: () => Promise<Omit<DataResult<T>, 'isFallback'>>,
  fallback: Omit<DataResult<T>, 'isFallback'>,
): Promise<DataResult<T>> {
  try {
    return { ...(await load()), isFallback: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (import.meta.env.DEV) console.warn(`[data] ${fallback.source} failed, using fallback:`, message);
    return { ...fallback, isFallback: true, error: message };
  }
}
