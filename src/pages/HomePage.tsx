import { Footer } from '@/features/ui/Footer';
import { Header } from '@/features/ui/Header';
import { Hero } from '@/features/ui/Hero';
import React from 'react';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};
