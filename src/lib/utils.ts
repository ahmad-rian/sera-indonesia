import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Locale = 'id' | 'en';

const INTL_LOCALE: Record<Locale, string> = { id: 'id-ID', en: 'en-GB' };

export function toIntlLocale(locale: string): string {
  return INTL_LOCALE[normalizeLocale(locale)];
}

export function normalizeLocale(locale: string | undefined): Locale {
  return locale?.toLowerCase().startsWith('en') ? 'en' : 'id';
}

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(toIntlLocale(locale)).format(value);
}

export function formatDate(iso: string, locale: string, withTime = false): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(toIntlLocale(locale), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' } : {}),
  }).format(date);
}

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export function formatRelative(iso: string, locale: string, now: Date = new Date()): string {
  const diff = new Date(iso).getTime() - now.getTime();
  if (Number.isNaN(diff)) return iso;
  const rtf = new Intl.RelativeTimeFormat(toIntlLocale(locale), { numeric: 'auto' });
  const abs = Math.abs(diff);
  if (abs < HOUR_MS) return rtf.format(Math.round(diff / MINUTE_MS), 'minute');
  if (abs < DAY_MS) return rtf.format(Math.round(diff / HOUR_MS), 'hour');
  return rtf.format(Math.round(diff / DAY_MS), 'day');
}

const COMPACT_IDR_THRESHOLD = 1_000_000;

/** Rupiah; values from one million upward use compact notation (e.g. "Rp41,3 jt"). */
export function formatIdr(value: number, locale: string): string {
  const compact = value >= COMPACT_IDR_THRESHOLD;
  return new Intl.NumberFormat(toIntlLocale(locale), {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: compact ? 1 : 0,
    notation: compact ? 'compact' : 'standard',
  }).format(value);
}
