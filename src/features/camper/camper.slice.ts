import type { Camper, Review } from '@/shared/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CamperState {
  current: Camper | null;
  reviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: CamperState = {
  current: null,
  reviews: [],
  status: 'idle',
};

const camperSlice = createSlice({
  name: 'camper',
  initialState,
  reducers: {
    setCamper: (state, action: PayloadAction<Camper>) => {
      state.current = action.payload;
      state.reviews = action.payload.reviews || [];
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    setStatus: (state, action: PayloadAction<CamperState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
    clearCamper: (state) => {
      state.current = null;
      state.reviews = [];
      state.status = 'idle';
      state.error = undefined;
    },
  },
});

export const {
  setCamper,
  setReviews,
  setStatus,
  setError,
  clearError,
  clearCamper,
} = camperSlice.actions;

export default camperSlice.reducer;
