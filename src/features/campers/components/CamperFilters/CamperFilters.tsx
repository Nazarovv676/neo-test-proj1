import { resetList } from '@/features/campers/campers.slice';
import { fetchCampers } from '@/features/campers/campers.thunks';
import { useAppDispatch } from '@/shared/hooks/redux';
import type { Filters } from '@/shared/types';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CamperFilters.module.css';


const VEHICLE_EQUIPMENT = [
  { key: 'airConditioner', label: 'AC', icon: '❄️' },
  { key: 'automatic', label: 'Automatic', icon: '⚙️' },
  { key: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { key: 'TV', label: 'TV', icon: '📺' },
  { key: 'bathroom', label: 'Bathroom', icon: '🚿' },
];

const VEHICLE_TYPES = [
  { key: 'fullyIntegrated', label: 'Fully Integrated', icon: '🏠' },
  { key: 'panelTruck', label: 'Panel Truck', icon: '🚐' },
  { key: 'alcove', label: 'Alcove', icon: '🏕️' },
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


export const CamperFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Parse current filters from URL
  const urlFilters = useMemo(() => parseFiltersFromSearch(searchParams), [searchParams]);
  
  // Local UI state for controlled inputs
  const [uiFilters, setUiFilters] = useState<Filters>(urlFilters);

  // Keep local UI in sync when URL changes externally (back/forward)
  useEffect(() => {
    setUiFilters(urlFilters);
  }, [urlFilters]);



  // Handle location input changes
  const handleLocationChange = (value: string) => {
    setUiFilters(prev => ({ ...prev, location: value || undefined }));
  };

  // Handle type selection changes
  const handleTypeChange = (value: string) => {
    const type = value as Filters['type'] || undefined;
    setUiFilters(prev => ({ ...prev, type }));
  };

  // Handle feature toggle changes
  const handleFeatureToggle = (feature: string) => {
    setUiFilters(prev => {
      const newFeatures = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features: newFeatures };
    });
  };

  // Handle search button click
  const handleSearch = () => {
    const newParams = buildSearchParamsFromFilters(uiFilters);
    setSearchParams(newParams, { replace: true });
    dispatch(resetList());
    dispatch(fetchCampers({ page: 1, limit: 12, filters: uiFilters }));
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Filters</h2>
      
      <div className={styles.filterGroup}>
        <label htmlFor="location" className={styles.inputLabel}>Location</label>
        <input
          id="location"
          type="text"
          placeholder="Enter location"
          value={uiFilters.location ?? ""}
          onChange={(e) => handleLocationChange(e.target.value)}
          className={styles.locationInput}
        />
      </div>
      
      <div className={styles.groups}>
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Vehicle equipment</h3>
          <div className={styles.badges}>
            {VEHICLE_EQUIPMENT.map((feature) => (
              <label key={feature.key} className={styles.badgeLabel}>
                <input
                  type="checkbox"
                  className={styles.badgeInput}
                  checked={uiFilters.features.includes(feature.key)}
                  onChange={() => handleFeatureToggle(feature.key)}
                />
                <span className={`${styles.badge} ${uiFilters.features.includes(feature.key) ? styles.badgeActive : ''}`}>
                  <span className={styles.badgeIcon}>{feature.icon}</span>
                  <span className={styles.badgeText}>{feature.label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Vehicle type</h3>
          <div className={styles.badges}>
            {VEHICLE_TYPES.map((type) => (
              <label key={type.key} className={styles.badgeLabel}>
                <input
                  type="radio"
                  name="vehicleType"
                  className={styles.badgeInput}
                  checked={uiFilters.type === type.key}
                  onChange={() => handleTypeChange(type.key)}
                />
                <span className={`${styles.badge} ${uiFilters.type === type.key ? styles.badgeActive : ''}`}>
                  <span className={styles.badgeIcon}>{type.icon}</span>
                  <span className={styles.badgeText}>{type.label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleSearch} 
        type="button"
        className={styles.searchButton}
      >
        Search
      </button>
    </div>
  );
};
