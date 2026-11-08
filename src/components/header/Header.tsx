import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import { LanguageSwitcher } from '../language-switcher/LanguageSwitcher';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';
import styles from './Header.module.scss';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Link className={styles.brand} to="/">
        {t('common.appName')}
      </Link>

      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/"
          end
        >
          {t('common.products')}
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/demo"
        >
          {t('common.reduxDemo')}
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/cart"
        >
          {t('common.cart')}
        </NavLink>

        <LanguageSwitcher />
        <ThemeSwitcher />
      </nav>
    </header>
  );
};
