import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import id from './locales/id.json';
import en from './locales/en.json';

export const LANG_STORAGE_KEY = 'sera-lang';
export const SUPPORTED_LANGUAGES = ['id', 'en'] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { id: { translation: id }, en: { translation: en } },
    fallbackLng: 'id',
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANG_STORAGE_KEY,
      caches: ['localStorage'],
    },
  });

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.startsWith('en') ? 'en' : 'id';
};
syncHtmlLang(i18n.language ?? 'id');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
