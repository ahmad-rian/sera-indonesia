import type { ReactNode } from 'react';

/** Wraps one headline word in a soft sage pill, like a highlighter stroke. */
export function HighlightWord({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span aria-hidden className="absolute inset-x-[-0.12em] inset-y-[0.06em] -z-10 rounded-full bg-sage-strong" />
      {children}
    </span>
  );
}
