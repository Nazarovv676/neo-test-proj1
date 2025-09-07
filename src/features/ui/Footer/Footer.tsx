import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>🚐</span>
              <span className={styles.logoText}>TravelTrucks</span>
            </div>
            <p className={styles.description}>
              Your perfect adventure companion. Rent premium campers and explore
              the world with comfort and style.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Company</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="#" className={styles.link}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Support</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="#" className={styles.link}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 TravelTrucks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
