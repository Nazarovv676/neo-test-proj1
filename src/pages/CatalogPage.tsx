import { resetList } from '@/features/campers/campers.slice';
import {
  fetchCampers,
  fetchMoreCampers,
} from '@/features/campers/campers.thunks';
import { CamperFilters, CamperGrid } from '@/features/campers/components';
import {
  selectCampers,
  selectError,
  selectHasError,
  selectHasMore,
  selectIsLoading,
} from '@/features/campers/selectors';
import { Loader } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import type { Filters } from '@/shared/types';
import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CatalogPage.module.css';

// Parse filters from URL search params
const parseFiltersFromSearch = (searchParams: URLSearchParams): Filters => {
  const location = searchParams.get('location') || undefined;
  const type = searchParams.get('type') as Filters['type'] || undefined;
  const features = searchParams.get('features')?.split(',').filter(Boolean) || [];
  
  return {
    location,
    type,
    features,
  };
};

export const CatalogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  
  const campers = useAppSelector(selectCampers);
  const isLoading = useAppSelector(selectIsLoading);
  const hasError = useAppSelector(selectHasError);
  const error = useAppSelector(selectError);
  const hasMore = useAppSelector(selectHasMore);

  // Parse filters from URL
  const filters = useMemo(() => parseFiltersFromSearch(searchParams), [searchParams]);
  
  // Create stable key for filters to trigger fetch
  const filtersKey = useMemo(() => 
    JSON.stringify(filters, Object.keys(filters).sort()), 
    [filters]
  );


  // Fetch campers when URL filters change
  useEffect(() => {
    dispatch(resetList());
    dispatch(fetchCampers({ page: 1, limit: 12, filters }));
  }, [dispatch, filtersKey, filters]);

  const handleLoadMore = () => {
    dispatch(fetchMoreCampers({ filters }));
  };

  return (
    <main className={styles.container}>
      <aside aria-label="Filters" className={styles.filters}>
        <CamperFilters />
      </aside>

      <section aria-label="Results" className={styles.results}>
        {hasError && (
          <div className={styles.error}>
            <p>Error: {error}</p>
          </div>
        )}

        {isLoading && campers.length === 0 ? (
          <div className={styles.loading}>
            <Loader size="lg" />
          </div>
        ) : (
          <CamperGrid
            campers={campers}
            hasMore={hasMore}
            loading={isLoading}
            onLoadMore={handleLoadMore}
          />
        )}
      </section>
    </main>
  );
};
