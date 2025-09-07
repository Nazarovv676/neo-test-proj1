import React from 'react';
import styles from './Rating.module.css';

export interface RatingProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  showCount?: boolean;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  showNumber = true,
  showCount = false,
  reviewCount,
  size = 'md',
  className = '',
}) => {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= Math.floor(rating);
    const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0;

    return (
      <span
        key={index}
        className={`${styles.star} ${styles[size]} ${
          isFilled
            ? styles.filled
            : isHalfFilled
              ? styles.halfFilled
              : styles.empty
        }`}
      >
        ★
      </span>
    );
  });

  const ratingClasses = [styles.rating, className].filter(Boolean).join(' ');

  return (
    <div className={ratingClasses}>
      <div className={styles.stars}>{stars}</div>
      {showNumber && <span className={styles.number}>{rating.toFixed(1)}</span>}
      {showCount && reviewCount !== undefined && (
        <span className={styles.count}>
          ({reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'})
        </span>
      )}
    </div>
  );
};
