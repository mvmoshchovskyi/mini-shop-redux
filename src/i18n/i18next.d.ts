import 'i18next';

import type en from './locales/en';

// Typed translations: t('...') now autocompletes keys and fails on typos.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}
