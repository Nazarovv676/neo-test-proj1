import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          {/* left column */}
          <Link to="/" className={styles.logo} aria-label="TravelTrucks">
            <img
              src="/traveltrucks-logo.svg"
              alt="TravelTrucks"
              width="140"
              height="32"
            />
          </Link>

          {/* center column */}
          <nav className={styles.nav} aria-label="Primary">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalog"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Catalog
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* right column (empty for now) */}
          <div className={styles.right} />
        </div>
      </div>
    </header>
  );
};
