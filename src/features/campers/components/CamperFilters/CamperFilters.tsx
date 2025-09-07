import { Button, Checkbox, Input, Select } from '@/shared/components';
import { debounce } from '@/shared/lib';
import type { Filters } from '@/shared/types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CamperFilters.module.css';

const CAMPER_TYPES = [
  { value: 'van', label: 'Van' },
  { value: 'fully-integrated', label: 'Fully Integrated' },
  { value: 'alcove', label: 'Alcove' },
  { value: 'panelTruck', label: 'Panel Truck' },
];

const FEATURES = [
  { key: 'airConditioner', label: 'AC' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'TV', label: 'TV' },
  { key: 'radio', label: 'Radio' },
  { key: 'microwave', label: 'Microwave' },
  { key: 'gas', label: 'Gas' },
  { key: 'water', label: 'Water' },
];

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

// Build search params from filters
const buildSearchParamsFromFilters = (filters: Filters): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.location) {
    params.set('location', filters.location);
  }
  
  if (filters.type) {
    params.set('type', filters.type);
  }
  
  if (filters.features.length > 0) {
    params.set('features', filters.features.sort().join(','));
  }
  
  return params;
};

// Stable serializer for comparing search params
const stableSerialize = (params: URLSearchParams): string => {
  const sorted = Array.from(params.entries()).sort(([a], [b]) => a.localeCompare(b));
  return new URLSearchParams(sorted).toString();
};

export const CamperFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Parse current filters from URL
  const urlFilters = useMemo(() => parseFiltersFromSearch(searchParams), [searchParams]);
  
  // Local UI state for controlled inputs
  const [uiFilters, setUiFilters] = useState<Filters>(urlFilters);

  // Keep local UI in sync when URL changes externally (back/forward)
  useEffect(() => {
    setUiFilters(urlFilters);
  }, [urlFilters]);

  // Debounced writer to URL
  const updateUrlFilters = useCallback(
    (newFilters: Filters) => {
      const newParams = buildSearchParamsFromFilters(newFilters);
      const newSerialized = stableSerialize(newParams);
      const currentSerialized = stableSerialize(searchParams);
      
      if (newSerialized !== currentSerialized) {
        setSearchParams(newParams, { replace: true });
      }
    },
    [searchParams, setSearchParams]
  );

  const debouncedUpdateUrl = useMemo(
    () => debounce(updateUrlFilters, 300),
    [updateUrlFilters]
  );

  // Handle location input changes
  const handleLocationChange = (value: string) => {
    const newFilters = { ...uiFilters, location: value || undefined };
    setUiFilters(newFilters);
    debouncedUpdateUrl(newFilters);
  };

  // Handle type selection changes
  const handleTypeChange = (value: string) => {
    const type = value as Filters['type'] || undefined;
    const newFilters = { ...uiFilters, type };
    setUiFilters(newFilters);
    updateUrlFilters(newFilters); // Immediate update for selection
  };

  // Handle feature toggle changes
  const handleFeatureToggle = (feature: string) => {
    const newFeatures = uiFilters.features.includes(feature)
      ? uiFilters.features.filter((f) => f !== feature)
      : [...uiFilters.features, feature];
    
    const newFilters = { ...uiFilters, features: newFeatures };
    setUiFilters(newFilters);
    updateUrlFilters(newFilters); // Immediate update for selection
  };

  // Handle reset filters
  const handleResetFilters = () => {
    const emptyFilters: Filters = { location: undefined, type: undefined, features: [] };
    setUiFilters(emptyFilters);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <Button variant="ghost" size="sm" onClick={handleResetFilters} type="button">
          Reset
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <Input
            label="Location"
            placeholder="Kyiv, Ukraine"
            value={uiFilters.location || ''}
            onChange={(e) => handleLocationChange(e.target.value)}
            fullWidth
          />
        </div>

        <div className={styles.section}>
          <Select
            label="Body type"
            placeholder="Select type"
            options={CAMPER_TYPES}
            value={uiFilters.type || ''}
            onChange={(e) => handleTypeChange(e.target.value)}
            fullWidth
          />
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Equipment</h3>
          <div className={styles.features}>
            {FEATURES.map((feature) => (
              <Checkbox
                key={feature.key}
                label={feature.label}
                checked={uiFilters.features.includes(feature.key)}
                onChange={() => handleFeatureToggle(feature.key)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
