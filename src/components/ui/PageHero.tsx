import { HighlightWord } from './HighlightWord';
import { Pill } from './Pill';

/** Shared top-of-page header: eyebrow pill + large headline with one highlighted word. */
export function PageHero({
  eyebrow,
  before,
  highlight,
  after,
  intro,
}: {
  eyebrow: string;
  before: string;
  highlight: string;
  after?: string;
  intro?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pb-24 lg:pt-20">
      <Pill>{eyebrow}</Pill>
      <h1 className="mt-6 max-w-5xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
        {before} <HighlightWord>{highlight}</HighlightWord>
        {after ? ` ${after}` : ''}
      </h1>
      {intro && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}
    </section>
  );
}
