import { Button } from '@/shared/components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleViewNow = () => {
    navigate('/catalog');
  };

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.text}>
            <h1 className={styles.title}>
              Discover Your Perfect
              <span className={styles.highlight}> Adventure</span>
            </h1>
            <p className={styles.subtitle}>
              Rent premium campers and explore the world with comfort and style.
              From cozy vans to fully-equipped motorhomes, find your ideal
              travel companion.
            </p>
            <div className={styles.actions}>
              <Button
                variant="primary"
                size="lg"
                onClick={handleViewNow}
                className={styles.ctaButton}
              >
                View Now
              </Button>
            </div>
          </div>

          <div className={styles.image}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.imageIcon}>🚐</span>
              <p className={styles.imageText}>Premium Campers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
