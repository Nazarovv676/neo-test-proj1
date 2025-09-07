import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { add, clear, hydrate, remove, selectFavoritesCount, selectFavoritesIds, selectIsFavorite, toggle } from '../favorites.slice';

describe('favorites slice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState();
      expect(state.favorites).toEqual({
        ids: [],
        hydrated: false,
        version: 1,
      });
    });
  });

  describe('actions', () => {
    it('should toggle favorite id', () => {
      store.dispatch(toggle('camper-1'));
      expect(store.getState().favorites.ids).toEqual(['camper-1']);

      store.dispatch(toggle('camper-1'));
      expect(store.getState().favorites.ids).toEqual([]);
    });

    it('should add favorite id', () => {
      store.dispatch(add('camper-1'));
      expect(store.getState().favorites.ids).toEqual(['camper-1']);

      // Adding the same id should not create duplicates
      store.dispatch(add('camper-1'));
      expect(store.getState().favorites.ids).toEqual(['camper-1']);
    });

    it('should remove favorite id', () => {
      store.dispatch(add('camper-1'));
      store.dispatch(add('camper-2'));
      
      store.dispatch(remove('camper-1'));
      expect(store.getState().favorites.ids).toEqual(['camper-2']);

      // Removing non-existent id should not cause errors
      store.dispatch(remove('camper-3'));
      expect(store.getState().favorites.ids).toEqual(['camper-2']);
    });

    it('should hydrate state', () => {
      const payload = {
        ids: ['camper-1', 'camper-2'],
        hydrated: true,
        version: 1,
      };
      
      store.dispatch(hydrate(payload));
      expect(store.getState().favorites).toEqual(payload);
    });

    it('should clear all favorites', () => {
      store.dispatch(add('camper-1'));
      store.dispatch(add('camper-2'));
      
      store.dispatch(clear());
      expect(store.getState().favorites.ids).toEqual([]);
    });
  });

  describe('selectors', () => {
    beforeEach(() => {
      store.dispatch(hydrate({
        ids: ['camper-1', 'camper-2'],
        hydrated: true,
        version: 1,
      }));
    });

    it('should select favorites ids', () => {
      const ids = selectFavoritesIds(store.getState());
      expect(ids).toEqual(['camper-1', 'camper-2']);
    });

    it('should select if camper is favorite', () => {
      const isFavorite1 = selectIsFavorite('camper-1')(store.getState());
      const isFavorite3 = selectIsFavorite('camper-3')(store.getState());
      
      expect(isFavorite1).toBe(true);
      expect(isFavorite3).toBe(false);
    });

    it('should select favorites count', () => {
      const count = selectFavoritesCount(store.getState());
      expect(count).toBe(2);
    });
  });
});
