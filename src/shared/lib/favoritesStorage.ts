import type { FavoritesState } from '@/features/favorites/favorites.slice';

const STORAGE_KEY = 'tt:favorites:v1';

/**
 * Safely parse JSON string, returning null if invalid
 */
export const safeParse = (json: string): FavoritesState | null => {
  try {
    const parsed = JSON.parse(json);
    
    // Validate the structure
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      Array.isArray(parsed.ids) &&
      typeof parsed.hydrated === 'boolean' &&
      parsed.version === 1
    ) {
      return {
        ids: parsed.ids.filter((id: unknown) => typeof id === 'string'),
        hydrated: parsed.hydrated,
        version: 1,
      };
    }
    
    return null;
  } catch {
    return null;
  }
};

/**
 * Read favorites from localStorage
 */
export const read = (): FavoritesState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    
    return safeParse(stored);
  } catch {
    // localStorage might be unavailable (private mode, etc.)
    return null;
  }
};

/**
 * Write favorites to localStorage
 */
export const write = (state: FavoritesState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage might be unavailable or quota exceeded
    // Silently fail to avoid breaking the app
  }
};

/**
 * Create a debounced version of the write function
 */
export const createDebouncedWrite = (delay: number = 150) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (state: FavoritesState) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      write(state);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Deep equality check for favorites state
 */
export const isEqual = (a: FavoritesState, b: FavoritesState): boolean => {
  if (a.ids.length !== b.ids.length) {
    return false;
  }
  
  const sortedA = [...a.ids].sort();
  const sortedB = [...b.ids].sort();
  
  return sortedA.every((id, index) => id === sortedB[index]);
};
