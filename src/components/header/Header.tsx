import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} to="/">
        Mini Shop
      </Link>

      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/"
          end
        >
          Products
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/cart"
        >
          Cart
        </NavLink>
      </nav>
    </header>
  );
};
