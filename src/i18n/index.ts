import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, type Language } from './config';
import en from './locales/en';
import uk from './locales/uk';

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (stored === 'uk' || stored === 'en') {
    return stored;
  }

  return DEFAULT_LANGUAGE;
};

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: uk },
  },
  lng: getInitialLanguage(),
  // English is the source of truth: if a key is missing in another
  // language, i18next will show the English value instead.
  fallbackLng: 'en',
  supportedLngs: ['uk', 'en'],
  // Missing keys return the key itself instead of null, so React never breaks.
  returnNull: false,
  // Resources are bundled, so there is no need to wait for async loading.
  initAsync: false,
  interpolation: {
    // React already escapes values, so i18next should not do it twice.
    escapeValue: false,
  },
});

document.documentElement.lang = i18n.language;

export default i18n;
