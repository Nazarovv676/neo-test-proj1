import apiClient from '@/shared/api/axios';
import { parseCamper } from '@/shared/api/parseCamper';
import type { Camper } from '@/shared/types';
import type { CamperApi } from '@/shared/types/camper.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCamperById = createAsyncThunk<
  Camper,
  string,
  { rejectValue: string }
>('camper/fetchCamperById', async (id: string, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<CamperApi>(`/campers/${id}`);
    return parseCamper(response.data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch camper';
    return rejectWithValue(errorMessage);
  }
});
