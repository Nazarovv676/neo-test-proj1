import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  ids: string[];
  hydrated: boolean;
  version: 1;
}

const initialState: FavoritesState = {
  ids: [],
  hydrated: false,
  version: 1,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      
      if (index === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(index, 1);
      }
    },
    add: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.ids.includes(id)) {
        state.ids.push(id);
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      if (index !== -1) {
        state.ids.splice(index, 1);
      }
    },
    hydrate: (state, action: PayloadAction<FavoritesState>) => {
      state.ids = action.payload.ids;
      state.hydrated = true;
      state.version = action.payload.version;
    },
    clear: (state) => {
      state.ids = [];
    },
  },
});

export const { toggle, add, remove, hydrate, clear } = favoritesSlice.actions;

// Selectors
export const selectFavoritesIds = (state: { favorites: FavoritesState }) => state.favorites.ids;

export const selectIsFavorite = (id: string) => 
  createSelector(
    [selectFavoritesIds],
    (ids) => ids.includes(id)
  );

export const selectFavoritesCount = (state: { favorites: FavoritesState }) => 
  state.favorites.ids.length;

export const selectFavoritesHydrated = (state: { favorites: FavoritesState }) => 
  state.favorites.hydrated;

export default favoritesSlice.reducer;
