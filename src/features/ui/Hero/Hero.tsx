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
      <figure className={styles.heroMedia}>
        <img src="/hero-campers.png" alt="Happy campers on the road" />
      </figure>
      <div className="container">
        <div className={styles.heroContent}>
          <h1>Campers of your dreams</h1>
          <p>You can find everything you want in our catalog</p>
          <a className="btn btn-primary" href="/catalog" onClick={(e) => { e.preventDefault(); handleViewNow(); }}>
            View Now
          </a>
        </div>
      </div>
    </section>
  );
};
