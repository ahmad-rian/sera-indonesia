import { useTranslation } from 'react-i18next';
import { normalizeLocale, type Locale } from './utils';

export type Localized = Record<Locale, string>;

export function pickLocalized(text: Localized, locale: string): string {
  return text[normalizeLocale(locale)];
}

/** Returns a picker bound to the active UI language. */
export function useLocalized() {
  const { i18n } = useTranslation();
  const locale = normalizeLocale(i18n.language);
  return { locale, t: (text: Localized) => text[locale] };
}
