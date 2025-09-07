import type { RootState } from '@/app/store';
import apiClient from '@/shared/api/axios';
import { parseCampers } from '@/shared/api/parseCamper';
import type { Camper, Filters } from '@/shared/types';
import type { CampersListApi } from '@/shared/types/camper.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface FetchCampersParams {
  page?: number;
  limit?: number;
  filters?: Filters;
}

interface FetchCampersResponse {
  data: Camper[];
  hasMore: boolean;
}

export const fetchCampers = createAsyncThunk<
  FetchCampersResponse,
  FetchCampersParams,
  { state: RootState }
>(
  'campers/fetchCampers',
  async ({ page = 1, limit = 4, filters }, { rejectWithValue, signal }) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      // Map filters to API parameters
      if (filters?.location) {
        params.append('location', filters.location);
      }

      if (filters?.type) {
        // Map domain type to API form field
        params.append('form', filters.type);
      }

      // Map feature filters to boolean parameters
      if (filters?.features && filters.features.length > 0) {
        filters.features.forEach((feature) => {
          // Map domain feature names to API field names
          const apiField = mapFeatureToApiField(feature);
          if (apiField) {
            params.append(apiField, 'true');
          }
        });
      }

      const response = await apiClient.get<CampersListApi>(`/campers?${params.toString()}`, {
        signal,
      });
      
      // Parse API data to domain models
      const campers = parseCampers(response.data.items || []);
      
      // Determine if there are more pages
      const hasMore = (response.data.items?.length || 0) === limit;

      return {
        data: campers,
        hasMore,
      };
    } catch (error: unknown) {
      if (signal?.aborted) {
        return rejectWithValue('Request cancelled');
      }
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch campers';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchMoreCampers = createAsyncThunk<
  FetchCampersResponse,
  { filters: Filters },
  { state: RootState }
>('campers/fetchMoreCampers', async ({ filters }, { getState, rejectWithValue, signal }) => {
  try {
    const state = getState();
    const { pagination } = state.campers;

    const nextPage = pagination.page + 1;
    const params = new URLSearchParams();
    params.append('page', nextPage.toString());
    params.append('limit', pagination.limit.toString());

    if (filters.location) {
      params.append('location', filters.location);
    }

    if (filters.type) {
      params.append('form', filters.type);
    }

    if (filters.features && filters.features.length > 0) {
      filters.features.forEach((feature) => {
        const apiField = mapFeatureToApiField(feature);
        if (apiField) {
          params.append(apiField, 'true');
        }
      });
    }

    const response = await apiClient.get<CampersListApi>(`/campers?${params.toString()}`, {
      signal,
    });
    
    const campers = parseCampers(response.data.items || []);
    const hasMore = (response.data.items?.length || 0) === pagination.limit;

    return {
      data: campers,
      hasMore,
    };
  } catch (error: unknown) {
    if (signal?.aborted) {
      return rejectWithValue('Request cancelled');
    }
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch more campers';
    return rejectWithValue(errorMessage);
  }
});

/**
 * Map domain feature names to API field names
 */
const mapFeatureToApiField = (feature: string): string | null => {
  const mapping: Record<string, string> = {
    airConditioner: 'AC',
    bathroom: 'bathroom',
    kitchen: 'kitchen',
    TV: 'TV',
    radio: 'radio',
    microwave: 'microwave',
    gas: 'gas',
    water: 'water',
    // Map other features to available API fields
    freezer: 'refrigerator', // Map to refrigerator field
    shower: 'bathroom', // Assume shower if bathroom
    toilet: 'bathroom', // Assume toilet if bathroom
    hob: 'kitchen', // Assume hob if kitchen
  };
  
  return mapping[feature] || null;
};
