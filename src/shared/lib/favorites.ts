const FAVORITES_STORAGE_KEY = 'tt:favorites:v1';

/**
 * Get favorites from localStorage
 */
export const getFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

/**
 * Save favorites to localStorage
 */
export const setFavorites = (favorites: string[]): void => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

/**
 * Add camper to favorites
 */
export const addToFavorites = (camperId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(camperId)) {
    setFavorites([...favorites, camperId]);
  }
};

/**
 * Remove camper from favorites
 */
export const removeFromFavorites = (camperId: string): void => {
  const favorites = getFavorites();
  setFavorites(favorites.filter((id) => id !== camperId));
};

/**
 * Check if camper is in favorites
 */
export const isFavorite = (camperId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(camperId);
};

/**
 * Toggle favorite status
 */
export const toggleFavorite = (camperId: string): void => {
  if (isFavorite(camperId)) {
    removeFromFavorites(camperId);
  } else {
    addToFavorites(camperId);
  }
};
