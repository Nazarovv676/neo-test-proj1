import camperReducer from '@/features/camper/camper.slice';
import campersReducer from '@/features/campers/campers.slice';
import favoritesReducer, { hydrate } from '@/features/favorites/favorites.slice';
import { createDebouncedWrite, isEqual, read } from '@/shared/lib/favoritesStorage';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    camper: camperReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hydrate favorites from localStorage on store creation
const initializeFavorites = () => {
  const stored = read();
  if (stored) {
    store.dispatch(hydrate(stored));
  } else {
    store.dispatch(hydrate({ ids: [], hydrated: true, version: 1 }));
  }
};

// Set up persistence and cross-tab sync
const setupFavoritesPersistence = () => {
  const debouncedWrite = createDebouncedWrite(150);
  let lastState: string[] = [];

  // Subscribe to favorites changes and persist them
  store.subscribe(() => {
    const currentState = store.getState().favorites;
    
    // Only write if the ids have actually changed
    if (!isEqual({ ids: lastState, hydrated: true, version: 1 }, currentState)) {
      lastState = [...currentState.ids];
      debouncedWrite(currentState);
    }
  });

  // Listen for cross-tab changes
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'tt:favorites:v1' && e.newValue) {
      const newState = JSON.parse(e.newValue);
      const currentState = store.getState().favorites;
      
      // Only update if the new state is different
      if (!isEqual(currentState, newState)) {
        store.dispatch(hydrate(newState));
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);

  // Cleanup function (though it won't be called in this context)
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

// Initialize favorites system
initializeFavorites();
setupFavoritesPersistence();
