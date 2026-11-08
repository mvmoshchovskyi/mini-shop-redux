import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import i18n from '../i18n';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from '../i18n/config';
import { LanguageContext } from './languageContext';

const readStoredLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return stored === 'uk' || stored === 'en' ? stored : DEFAULT_LANGUAGE;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  // Context — джерело істини в React, i18n отримує мову з нього.
  useEffect(() => {
    void i18n.changeLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === 'uk' ? 'en' : 'uk'));
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
