import { getFeatureDisplayName } from '@/shared/lib';
import type { Camper } from '@/shared/types';
import React from 'react';
import styles from './CamperFeatures.module.css';

interface CamperFeaturesProps {
  camper: Camper;
}

export const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
  const features = Object.entries(camper.features)
    .filter(([, value]) => value && value > 0)
    .map(([key, value]) => ({
      key,
      label: getFeatureDisplayName(key),
      value,
    }));

  if (features.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Features</h3>
        <p className={styles.empty}>No features available</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Features</h3>
      <div className={styles.grid}>
        {features.map((feature) => (
          <div key={feature.key} className={styles.feature}>
            <div className={styles.featureIcon}>
              {getFeatureIcon(feature.key)}
            </div>
            <div className={styles.featureContent}>
              <div className={styles.featureLabel}>{feature.label}</div>
              {feature.value > 1 && (
                <div className={styles.featureValue}>×{feature.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getFeatureIcon = (key: string): string => {
  const iconMap: Record<string, string> = {
    airConditioner: '❄️',
    bathroom: '🚿',
    kitchen: '🍳',
    beds: '🛏️',
    TV: '📺',
    CD: '💿',
    radio: '📻',
    shower: '🚿',
    toilet: '🚽',
    freezer: '🧊',
    hob: '🔥',
    microwave: '📡',
    gas: '⛽',
    water: '💧',
  };

  return iconMap[key] || '✅';
};
