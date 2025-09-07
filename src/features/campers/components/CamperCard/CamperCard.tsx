import { toggleFavorite } from '@/features/campers/campers.slice';
import { Badge, Button, Rating } from '@/shared/components';
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
  const favorites = useAppSelector((state) => state.campers.favorites);

  const isFavorite = favorites.includes(camper.id);
  const features = getAvailableFeatures(camper);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(camper.id));
  };


  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={camper.gallery[0] || '/placeholder-camper.jpg'}
          alt={camper.name}
          className={styles.image}
        />
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          ♥
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles.price}>{formatPrice(camper.price)}</div>
        </div>

        <div className={styles.rating}>
          <Rating
            rating={camper.rating}
            showNumber
            showCount
            reviewCount={camper.reviews.length}
            size="sm"
          />
        </div>

        <div className={styles.location}>📍 {camper.location}</div>

        <div className={styles.features}>
          {features.slice(0, 4).map((feature) => (
            <Badge key={feature} variant="secondary" size="sm">
              {feature}
            </Badge>
          ))}
          {features.length > 4 && (
            <Badge variant="secondary" size="sm">
              +{features.length - 4} more
            </Badge>
          )}
        </div>

        <div className={styles.actions}>
          <Link to={`/catalog/${camper.id}`} target="_blank" rel="noopener">
            <Button
              variant="outline"
              size="md"
              fullWidth
            >
              Show more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
