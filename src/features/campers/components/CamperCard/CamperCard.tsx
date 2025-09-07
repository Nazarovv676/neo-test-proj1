import { selectFavoritesHydrated, toggle } from '@/features/favorites/favorites.slice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { formatPrice, getAvailableFeatures } from '@/shared/lib';
import type { Camper } from '@/shared/types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';

interface CamperCardProps {
  camper: Camper;
}

export const CamperCard: React.FC<CamperCardProps> = ({ camper }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.ids);
  const hydrated = useAppSelector(selectFavoritesHydrated);

  const isFavorite = hydrated && favorites.includes(camper.id);
  const features = getAvailableFeatures(camper);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggle(camper.id));
  };


  return (
    <article className={styles.card}>
      <div className={styles.cardMedia}>
        <img
          src={camper.gallery[0] || '/placeholder-camper.jpg'}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.cardBody}>
        <header className={styles.cardTop}>
          <h3 className={styles.cardTitle}>{camper.name}</h3>
          <div className={styles.cardPrice}>{formatPrice(camper.price)}</div>
          <button
            className={styles.iconBtn}
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={isFavorite}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </header>

        <div className={styles.cardMeta}>
          <span className={styles.metaRating}>
            <span style={{ color: 'var(--tt-star)' }}>★</span> {camper.rating} ({camper.reviews.length} Reviews)
          </span>
          <span className={styles.metaLocation}>📍 {camper.location}</span>
        </div>

        <p className={styles.cardDesc}>
          Experience the perfect blend of comfort and adventure with this premium camper.
        </p>

        <div className={styles.cardFeatures}>
          {features.slice(0, 4).map((feature) => (
            <span key={feature} className={styles.chip}>
              {feature}
            </span>
          ))}
        </div>

        <div className={styles.cardActions}>
          <Link to={`/catalog/${camper.id}`} target="_blank" rel="noopener">
            <button className={styles.btnPrimary}>
              Show more
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};
