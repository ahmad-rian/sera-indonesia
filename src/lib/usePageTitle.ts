import { useEffect } from 'react';

const BASE_TITLE = 'SERA Indonesia';

/** Sets document.title as "<page> · SERA Indonesia", or just the base title. */
export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} · ${BASE_TITLE}` : `${BASE_TITLE} — Semesta Ruang Alam`;
  }, [page]);
}
