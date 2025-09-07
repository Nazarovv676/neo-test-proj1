import type { Camper, Filters, PaginationState } from '@/shared/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCampers, fetchMoreCampers } from './campers.thunks';

interface CampersState {
  list: Camper[];
  filters: Filters;
  pagination: PaginationState;
  favorites: string[];
}

const initialState: CampersState = {
  list: [],
  filters: {
    features: [],
  },
  pagination: {
    page: 1,
    limit: 4,
    hasMore: true,
    status: 'idle',
  },
  favorites: [],
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    setCampers: (state, action: PayloadAction<Camper[]>) => {
      state.list = action.payload;
    },
    appendCampers: (state, action: PayloadAction<Camper[]>) => {
      state.list = [...state.list, ...action.payload];
    },
    clearCampers: (state) => {
      state.list = [];
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.filters.location = action.payload;
    },
    setType: (state, action: PayloadAction<Filters['type']>) => {
      state.filters.type = action.payload;
    },
    setFeatures: (state, action: PayloadAction<string[]>) => {
      state.filters.features = action.payload;
    },
    toggleFeature: (state, action: PayloadAction<string>) => {
      const feature = action.payload;
      const index = state.filters.features.indexOf(feature);

      if (index === -1) {
        state.filters.features.push(feature);
      } else {
        state.filters.features.splice(index, 1);
      }
    },
    setPagination: (state, action: PayloadAction<Partial<PaginationState>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.pagination.hasMore = action.payload;
    },
    setStatus: (state, action: PayloadAction<PaginationState['status']>) => {
      state.pagination.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.pagination.error = action.payload;
    },
    clearError: (state) => {
      state.pagination.error = undefined;
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const camperId = action.payload;
      const index = state.favorites.indexOf(camperId);

      if (index === -1) {
        state.favorites.push(camperId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    resetFilters: (state) => {
      state.filters = {
        features: [],
      };
    },
    resetList: (state) => {
      state.list = [];
      state.pagination.page = 1;
      state.pagination.hasMore = true;
      state.pagination.status = 'idle';
      state.pagination.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCampers
      .addCase(fetchCampers.pending, (state) => {
        state.pagination.status = 'loading';
        state.pagination.error = undefined;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.pagination.status = 'succeeded';
        state.list = action.payload.data;
        state.pagination.hasMore = action.payload.hasMore;
        state.pagination.page = 1;
        state.pagination.error = undefined;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.pagination.status = 'failed';
        state.pagination.error = action.payload as string;
      })
      // fetchMoreCampers
      .addCase(fetchMoreCampers.pending, (state) => {
        state.pagination.status = 'loading';
        state.pagination.error = undefined;
      })
      .addCase(fetchMoreCampers.fulfilled, (state, action) => {
        state.pagination.status = 'succeeded';
        state.list = [...state.list, ...action.payload.data];
        state.pagination.hasMore = action.payload.hasMore;
        state.pagination.page += 1;
        state.pagination.error = undefined;
      })
      .addCase(fetchMoreCampers.rejected, (state, action) => {
        state.pagination.status = 'failed';
        state.pagination.error = action.payload as string;
      });
  },
});

export const {
  setCampers,
  appendCampers,
  clearCampers,
  setFilters,
  setLocation,
  setType,
  setFeatures,
  toggleFeature,
  setPagination,
  setPage,
  setHasMore,
  setStatus,
  setError,
  clearError,
  setFavorites,
  toggleFavorite,
  resetFilters,
  resetList,
} = campersSlice.actions;

export default campersSlice.reducer;
