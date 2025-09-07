import type { CamperApi } from '@/shared/types/camper.api';
import type { Camper, Review } from '@/shared/types/camper.domain';

/**
 * Normalize and clean string values
 */
const normalizeString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.trim();
  }
  return '';
};

/**
 * Normalize boolean to number (0 or 1)
 */
const normalizeBoolean = (value: unknown): number => {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  if (typeof value === 'number') {
    return value > 0 ? 1 : 0;
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    return lower === 'true' || lower === '1' || lower === 'yes' ? 1 : 0;
  }
  return 0;
};

/**
 * Parse gallery images from API format
 */
const parseGallery = (gallery: unknown): string[] => {
  if (Array.isArray(gallery)) {
    return gallery
      .map((item) => {
        if (typeof item === 'string') {
          // Handle string format like "@{thumb=...; original=...}"
          const match = item.match(/original=([^;]+)/);
          return match ? match[1] : item;
        }
        if (typeof item === 'object' && item !== null) {
          const obj = item as Record<string, unknown>;
          return typeof obj.original === 'string' ? obj.original : '';
        }
        return '';
      })
      .filter(Boolean);
  }
  return [];
};

/**
 * Parse reviews from API format
 */
const parseReviews = (reviews: unknown): Review[] => {
  if (Array.isArray(reviews)) {
    return reviews
      .map((review) => {
        if (typeof review === 'string') {
          // Handle string format like "@{reviewer_name=...; reviewer_rating=...; comment=...}"
          const nameMatch = review.match(/reviewer_name=([^;]+)/);
          const ratingMatch = review.match(/reviewer_rating=([^;]+)/);
          const commentMatch = review.match(/comment=([^}]+)/);
          
          return {
            reviewer_name: nameMatch ? nameMatch[1] : 'Anonymous',
            reviewer_rating: ratingMatch ? Number(ratingMatch[1]) || 0 : 0,
            comment: commentMatch ? commentMatch[1] : '',
          };
        }
        if (typeof review === 'object' && review !== null) {
          const obj = review as Record<string, unknown>;
          return {
            reviewer_name: normalizeString(obj.reviewer_name),
            reviewer_rating: typeof obj.reviewer_rating === 'number' ? obj.reviewer_rating : 0,
            comment: normalizeString(obj.comment),
          };
        }
        return null;
      })
      .filter((review): review is Review => review !== null);
  }
  return [];
};

/**
 * Calculate average rating from reviews
 */
const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + review.reviewer_rating, 0);
  const average = sum / reviews.length;
  
  // Round to nearest 0.5 and clamp between 0-5
  return Math.min(5, Math.max(0, Math.round(average * 2) / 2));
};

/**
 * Map form type to adults capacity
 */
const getAdultsFromForm = (form: string): number => {
  const formLower = form.toLowerCase();
  if (formLower.includes('large') || formLower.includes('family')) return 6;
  if (formLower.includes('small') || formLower.includes('panel')) return 2;
  return 4; // Default for alcove, fully-integrated
};

/**
 * Transform API camper data to domain model
 */
export const parseCamper = (apiData: CamperApi): Camper => {
  const reviews = parseReviews(apiData.reviews);
  const averageRating = apiData.rating ?? calculateAverageRating(reviews);
  
  return {
    id: apiData.id,
    name: normalizeString(apiData.name),
    price: apiData.price || 0,
    rating: averageRating,
    location: normalizeString(apiData.location),
    description: normalizeString(apiData.description),
    adults: getAdultsFromForm(apiData.form || ''),
    engine: normalizeString(apiData.engine),
    transmission: normalizeString(apiData.transmission),
    
    details: {
      form: normalizeString(apiData.form),
      length: normalizeString(apiData.length),
      width: normalizeString(apiData.width),
      height: normalizeString(apiData.height),
      tank: normalizeString(apiData.tank),
      consumption: normalizeString(apiData.consumption),
    },
    
    gallery: parseGallery(apiData.gallery),
    reviews,
    
    features: {
      airConditioner: normalizeBoolean(apiData.AC),
      bathroom: normalizeBoolean(apiData.bathroom),
      kitchen: normalizeBoolean(apiData.kitchen),
      beds: 1, // Default, could be derived from form type
      TV: normalizeBoolean(apiData.TV),
      CD: 0, // Not in API, default to 0
      radio: normalizeBoolean(apiData.radio),
      shower: normalizeBoolean(apiData.bathroom), // Assume shower if bathroom
      toilet: normalizeBoolean(apiData.bathroom), // Assume toilet if bathroom
      freezer: normalizeBoolean(apiData.refrigerator), // Map refrigerator to freezer
      hob: normalizeBoolean(apiData.kitchen), // Assume hob if kitchen
      microwave: normalizeBoolean(apiData.microwave),
      gas: normalizeBoolean(apiData.gas),
      water: normalizeBoolean(apiData.water),
    },
  };
};

/**
 * Parse multiple campers
 */
export const parseCampers = (apiData: CamperApi[]): Camper[] => {
  return apiData.map(parseCamper);
};
