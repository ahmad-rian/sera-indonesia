import { Sparkle } from 'lucide-react';

/** Infinite horizontal ticker. Content is duplicated once so the loop is seamless. */
export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="group relative overflow-hidden border-y border-line bg-sage py-3" role="marquee" aria-label={items.join(' · ')}>
      <ul aria-hidden className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
        {loop.map((text, i) => (
          <li key={i} className="flex items-center gap-6 text-sm font-semibold text-forest">
            {text}
            <Sparkle className="size-4" strokeWidth={2} />
          </li>
        ))}
      </ul>
    </div>
  );
}
