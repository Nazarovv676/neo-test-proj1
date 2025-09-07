import { Hero } from '@/features/ui/Hero';
import React from 'react';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
      </main>
    </div>
  );
};
