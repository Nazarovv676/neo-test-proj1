import { Rating } from '@/shared/components';
import type { Review } from '@/shared/types';
import React from 'react';
import styles from './Reviews.module.css';

interface ReviewsProps {
  reviews: Review[];
  averageRating: number;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, averageRating }) => {
  if (reviews.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Reviews</h3>
        <p className={styles.empty}>No reviews yet</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Reviews</h3>

      <div className={styles.summary}>
        <div className={styles.rating}>
          <Rating
            rating={averageRating}
            showNumber
            showCount
            reviewCount={reviews.length}
            size="lg"
          />
        </div>
      </div>

      <div className={styles.list}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewer}>
                <div className={styles.avatar}>
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerName}>
                    {review.reviewer_name}
                  </div>
                  <Rating rating={review.reviewer_rating} size="sm" />
                </div>
              </div>
            </div>

            {review.comment && (
              <div className={styles.comment}>{review.comment}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
