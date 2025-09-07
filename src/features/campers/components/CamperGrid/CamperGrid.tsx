import { LoadMore } from '@/shared/components';
import type { Camper } from '@/shared/types';
import React from 'react';
import { CamperCard } from '../CamperCard';
import styles from './CamperGrid.module.css';

interface CamperGridProps {
  campers: Camper[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export const CamperGrid: React.FC<CamperGridProps> = ({
  campers,
  hasMore,
  loading,
  onLoadMore,
}) => {
  if (campers.length === 0 && !loading) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🚐</div>
        <h3 className={styles.emptyTitle}>No campers found</h3>
        <p className={styles.emptyText}>
          No campers match your current filters. Try adjusting your search
          criteria.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      <LoadMore hasMore={hasMore} loading={loading} onLoadMore={onLoadMore} />
    </div>
  );
};
