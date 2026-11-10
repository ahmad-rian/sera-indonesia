import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

type Variant = 'dark' | 'sage' | 'ghost' | 'outline';
type Size = 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  dark: 'bg-ink text-bg hover:bg-forest hover:text-forest-ink',
  sage: 'bg-sage text-ink hover:bg-sage-strong',
  ghost: 'text-ink hover:bg-surface-2',
  outline: 'border border-ink/15 text-ink hover:border-ink/40 hover:bg-surface',
};

const SIZE: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  (
    | ({ to: string; href?: never } & Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'className' | 'children'>)
    | ({ href: string; to?: never } & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>)
    | ({ to?: never; href?: never } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>)
  );

function buttonClass(variant: Variant = 'dark', size: Size = 'md', className?: string) {
  return cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap',
    'transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]',
    'disabled:pointer-events-none disabled:opacity-50',
    VARIANT[variant],
    SIZE[size],
    className,
  );
}

export function Button({ variant, size, arrow, className, children, ...rest }: ButtonProps) {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  const cls = buttonClass(variant, size, className);

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link {...rest} className={cls}>
        {content}
      </Link>
    );
  }
  if ('href' in rest && rest.href !== undefined) {
    const external = /^https?:/.test(rest.href);
    return (
      <a {...rest} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" {...(rest as ComponentPropsWithoutRef<'button'>)} className={cls}>
      {content}
    </button>
  );
}
