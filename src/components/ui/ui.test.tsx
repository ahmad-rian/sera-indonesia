import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Flame } from 'lucide-react';
import i18n from '../../i18n';
import { renderWithProviders } from '../../test/render';
import { BentoCard } from './BentoCard';
import { Button } from './Button';
import { DataMeta } from './DataMeta';
import { HighlightWord } from './HighlightWord';
import { IconBadge } from './IconBadge';
import { LangToggle } from './LangToggle';
import { Marquee } from './Marquee';
import { PageHero } from './PageHero';
import { Pill } from './Pill';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { Skeleton } from './Skeleton';
import { ThemeToggle } from './ThemeToggle';

describe('Button', () => {
  it('renders a router link for `to`', () => {
    renderWithProviders(<Button to="/lapor">Lapor</Button>);
    expect(screen.getByRole('link', { name: 'Lapor' })).toHaveAttribute('href', '/lapor');
  });

  it('opens external hrefs in a new tab safely', () => {
    renderWithProviders(<Button href="https://example.org" arrow>Ext</Button>);
    const link = screen.getByRole('link', { name: 'Ext' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps mailto links in the same tab', () => {
    renderWithProviders(<Button href="mailto:a@b.c">Mail</Button>);
    expect(screen.getByRole('link', { name: 'Mail' })).not.toHaveAttribute('target');
  });

  it('renders a type=button by default', async () => {
    const onClick = vi.fn();
    renderWithProviders(<Button onClick={onClick} variant="sage" size="lg">Go</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});

describe('DataMeta', () => {
  it('shows a live indicator with source', () => {
    renderWithProviders(<DataMeta source="BMKG" asOf={new Date().toISOString()} isFallback={false} />);
    expect(screen.getByText(/Langsung/)).toBeInTheDocument();
    expect(screen.getByText('Sumber: BMKG')).toBeInTheDocument();
  });

  it('labels fallback snapshots with their date', () => {
    renderWithProviders(<DataMeta source="snap" asOf="2026-11-09T07:00:00Z" isFallback />);
    expect(screen.getByText(/Data cadangan per 9 Nov 2026/)).toBeInTheDocument();
  });
});

describe('LangToggle', () => {
  it('switches the UI language and updates <html lang>', async () => {
    renderWithProviders(<LangToggle />);
    await userEvent.click(screen.getByRole('button', { name: 'en' }));
    expect(i18n.language).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('button', { name: 'en' })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('ThemeToggle', () => {
  it('toggles data-theme and persists the choice', async () => {
    renderWithProviders(<ThemeToggle />);
    const before = document.documentElement.dataset.theme;
    await userEvent.click(screen.getByRole('button'));
    const after = document.documentElement.dataset.theme;
    expect(after).not.toBe(before);
    expect(localStorage.getItem('sera-theme')).toBe(after);
  });
});

describe('presentational primitives', () => {
  it('render their content', () => {
    renderWithProviders(
      <>
        <PageHero eyebrow="Eyebrow" before="Jaga" highlight="alam" after="kita" intro="Intro" />
        <SectionHeader eyebrow="Label" title="Judul" intro="Teks" />
        <HighlightWord>sorot</HighlightWord>
        <Pill tone="danger">Kritis</Pill>
        <BentoCard tone="forest">Kartu</BentoCard>
        <IconBadge icon={Flame} tone="forest" size="lg" />
        <Skeleton />
        <Marquee items={['Satu', 'Dua']} />
      </>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Jaga alam kita');
    expect(screen.getByRole('heading', { level: 2, name: 'Judul' })).toBeInTheDocument();
    expect(screen.getByText('sorot')).toBeInTheDocument();
    expect(screen.getByRole('marquee')).toHaveAccessibleName('Satu · Dua');
  });
});

describe('Reveal', () => {
  it('becomes visible when intersecting', () => {
    let trigger: (entries: Partial<IntersectionObserverEntry>[]) => void = () => {};
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: typeof trigger) {
          trigger = cb;
        }
        observe() {}
        disconnect() {}
      },
    );
    renderWithProviders(<Reveal>Isi</Reveal>);
    const el = screen.getByText('Isi');
    expect(el).toHaveClass('opacity-0');
    act(() => trigger([{ isIntersecting: true }]));
    expect(el).toHaveClass('opacity-100');
    vi.unstubAllGlobals();
  });

  it('shows immediately without IntersectionObserver', () => {
    renderWithProviders(<Reveal>Isi</Reveal>);
    expect(screen.getByText('Isi')).toHaveClass('opacity-100');
  });
});
