import { useTranslation } from 'react-i18next';

import { useTheme } from '../../context/useTheme';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleTheme}
      title={isDark ? t('common.switchToLight') : t('common.switchToDark')}
      aria-label={isDark ? t('common.switchToLight') : t('common.switchToDark')}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>
      {isDark ? t('common.light') : t('common.dark')}
    </button>
  );
};
