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
  const currentFilters = parseFiltersFromSearch(searchParams);
  
  // Local state for form inputs
  const [locationInput, setLocationInput] = useState(currentFilters.location || '');
  const [typeInput, setTypeInput] = useState(currentFilters.type || '');
  const [featuresInput, setFeaturesInput] = useState<string[]>(currentFilters.features || []);

  // Update local state when URL changes
  useEffect(() => {
    setLocationInput(currentFilters.location || '');
    setTypeInput(currentFilters.type || '');
    setFeaturesInput(currentFilters.features || []);
  }, [currentFilters]);

  // Debounced update function
  const updateFilters = useCallback(
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

  const debouncedUpdateFilters = useMemo(
    () => debounce(updateFilters, 300),
    [updateFilters]
  );

  // Update URL when location changes
  useEffect(() => {
    if (locationInput !== (currentFilters.location || '')) {
      debouncedUpdateFilters({
        ...currentFilters,
        location: locationInput || undefined,
      });
    }
  }, [locationInput, debouncedUpdateFilters, currentFilters]);

  const handleTypeChange = (value: string) => {
    const type = value as Filters['type'] || undefined;
    setTypeInput(type || '');
    // Update immediately for type selection
    updateFilters({
      ...currentFilters,
      type,
    });
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = featuresInput.includes(feature)
      ? featuresInput.filter((f) => f !== feature)
      : [...featuresInput, feature];
    
    setFeaturesInput(newFeatures);
    // Update immediately for feature selection
    updateFilters({
      ...currentFilters,
      features: newFeatures,
    });
  };

  const handleResetFilters = () => {
    setLocationInput('');
    setTypeInput('');
    setFeaturesInput([]);
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
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            fullWidth
          />
        </div>

        <div className={styles.section}>
          <Select
            label="Body type"
            placeholder="Select type"
            options={CAMPER_TYPES}
            value={typeInput}
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
                checked={featuresInput.includes(feature.key)}
                onChange={() => handleFeatureToggle(feature.key)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
