import { Button } from '@/shared/components/Button';
import React from 'react';
import styles from './LoadMore.module.css';

export interface LoadMoreProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  className?: string;
}

export const LoadMore: React.FC<LoadMoreProps> = ({
  onLoadMore,
  hasMore,
  loading,
  className = '',
}) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <Button
        variant="outline"
        size="lg"
        onClick={onLoadMore}
        loading={loading}
        fullWidth
      >
        {loading ? 'Loading...' : 'Load more'}
      </Button>
    </div>
  );
};
