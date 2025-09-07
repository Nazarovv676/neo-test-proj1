import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🚐</span>
            <span className={styles.logoText}>TravelTrucks</span>
          </Link>

          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            <Link to="/catalog" className={styles.navLink}>
              Catalog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
