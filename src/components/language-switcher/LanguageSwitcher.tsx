import { useTranslation } from 'react-i18next';

import { useLanguage } from '../../context/useLanguage';
import { SUPPORTED_LANGUAGES } from '../../i18n/config';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={styles.switcher}
      role="group"
      aria-label={t('common.language')}
    >
      {SUPPORTED_LANGUAGES.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.option} ${
            language === option.value ? styles.active : ''
          }`}
          onClick={() => setLanguage(option.value)}
          aria-pressed={language === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
