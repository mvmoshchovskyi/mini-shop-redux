import { createContext } from 'react';

import type { Language } from '../i18n/config';

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
