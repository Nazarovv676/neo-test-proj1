import type { FavoritesState } from '@/features/favorites/favorites.slice';
import { vi } from 'vitest';
import { createDebouncedWrite, isEqual, read, safeParse, write } from '../favoritesStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('favoritesStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('safeParse', () => {
    it('should parse valid JSON', () => {
      const validState: FavoritesState = {
        ids: ['camper-1', 'camper-2'],
        hydrated: true,
        version: 1,
      };
      
      const result = safeParse(JSON.stringify(validState));
      expect(result).toEqual(validState);
    });

    it('should return null for invalid JSON', () => {
      const result = safeParse('invalid json');
      expect(result).toBeNull();
    });

    it('should return null for invalid structure', () => {
      const result = safeParse(JSON.stringify({ invalid: 'structure' }));
      expect(result).toBeNull();
    });

    it('should filter out non-string ids', () => {
      const invalidState = {
        ids: ['camper-1', 123, 'camper-2', null],
        hydrated: true,
        version: 1,
      };
      
      const result = safeParse(JSON.stringify(invalidState));
      expect(result).toEqual({
        ids: ['camper-1', 'camper-2'],
        hydrated: true,
        version: 1,
      });
    });
  });

  describe('read', () => {
    it('should read from localStorage', () => {
      const state: FavoritesState = {
        ids: ['camper-1'],
        hydrated: true,
        version: 1,
      };
      
      localStorageMock.setItem('tt:favorites:v1', JSON.stringify(state));
      const result = read();
      expect(result).toEqual(state);
    });

    it('should return null when no data exists', () => {
      const result = read();
      expect(result).toBeNull();
    });

    it('should return null when localStorage throws', () => {
      // Mock localStorage to throw
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem = () => {
        throw new Error('localStorage unavailable');
      };

      const result = read();
      expect(result).toBeNull();

      // Restore original
      localStorageMock.getItem = originalGetItem;
    });
  });

  describe('write', () => {
    it('should write to localStorage', () => {
      const state: FavoritesState = {
        ids: ['camper-1'],
        hydrated: true,
        version: 1,
      };
      
      write(state);
      const stored = localStorageMock.getItem('tt:favorites:v1');
      expect(JSON.parse(stored!)).toEqual(state);
    });

    it('should not throw when localStorage is unavailable', () => {
      // Mock localStorage to throw
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = () => {
        throw new Error('localStorage unavailable');
      };

      const state: FavoritesState = {
        ids: ['camper-1'],
        hydrated: true,
        version: 1,
      };

      expect(() => write(state)).not.toThrow();

      // Restore original
      localStorageMock.setItem = originalSetItem;
    });
  });

  describe('createDebouncedWrite', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should debounce writes', () => {
      const debouncedWrite = createDebouncedWrite(100);
      const state: FavoritesState = {
        ids: ['camper-1'],
        hydrated: true,
        version: 1,
      };

      debouncedWrite(state);
      debouncedWrite(state);
      debouncedWrite(state);

      // Should not have written yet
      expect(localStorageMock.getItem('tt:favorites:v1')).toBeNull();

      // Fast forward time
      vi.advanceTimersByTime(100);

      // Should have written once
      const stored = localStorageMock.getItem('tt:favorites:v1');
      expect(stored).toBeTruthy();
    });
  });

  describe('isEqual', () => {
    it('should return true for equal states', () => {
      const state1: FavoritesState = {
        ids: ['camper-1', 'camper-2'],
        hydrated: true,
        version: 1,
      };
      
      const state2: FavoritesState = {
        ids: ['camper-2', 'camper-1'], // Different order
        hydrated: true,
        version: 1,
      };

      expect(isEqual(state1, state2)).toBe(true);
    });

    it('should return false for different states', () => {
      const state1: FavoritesState = {
        ids: ['camper-1'],
        hydrated: true,
        version: 1,
      };
      
      const state2: FavoritesState = {
        ids: ['camper-1', 'camper-2'],
        hydrated: true,
        version: 1,
      };

      expect(isEqual(state1, state2)).toBe(false);
    });
  });
});
