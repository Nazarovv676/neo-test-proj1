import type { Camper, Review } from '@/shared/types';

/**
 * Format price to display with euro symbol and two decimal places
 */
export const formatPrice = (price: number): string => {
  return `€${price.toFixed(2)}`;
};

/**
 * Calculate average rating from reviews array
 */
export const calcAverageRating = (reviews: Review[]): number => {
  if (!reviews || reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.reviewer_rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal place
};

/**
 * Get feature display name from key
 */
export const getFeatureDisplayName = (key: string): string => {
  const featureMap: Record<string, string> = {
    airConditioner: 'AC',
    bathroom: 'Bathroom',
    kitchen: 'Kitchen',
    beds: 'Beds',
    TV: 'TV',
    CD: 'CD',
    radio: 'Radio',
    shower: 'Shower',
    toilet: 'Toilet',
    freezer: 'Freezer',
    hob: 'Hob',
    microwave: 'Microwave',
    gas: 'Gas',
    water: 'Water',
  };

  return featureMap[key] || key;
};

/**
 * Get available features from camper
 */
export const getAvailableFeatures = (camper: Camper): string[] => {
  const features: string[] = [];

  Object.entries(camper.features).forEach(([key, value]) => {
    if (value && value > 0) {
      features.push(getFeatureDisplayName(key));
    }
  });

  return features;
};

/**
 * Debounce function for search inputs
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format date for display
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Check if date is in the future
 */
export const isFutureDate = (date: string | Date): boolean => {
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};
