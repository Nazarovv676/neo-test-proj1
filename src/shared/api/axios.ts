import { CamperApiSchema, CampersListApiSchema } from '@/shared/types/camper.api';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with schema validation
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Validate response data based on endpoint
    const url = response.config.url || '';
    
    try {
      if (url.includes('/campers') && !url.includes('/campers/')) {
        // List endpoint
        const result = CampersListApiSchema.safeParse(response.data);
        if (!result.success) {
          console.warn('API response validation failed for campers list:', result.error);
          // Don't throw, just log warning in development
        }
      } else if (url.match(/\/campers\/\d+$/)) {
        // Single camper endpoint
        const result = CamperApiSchema.safeParse(response.data);
        if (!result.success) {
          console.warn('API response validation failed for single camper:', result.error);
          // Don't throw, just log warning in development
        }
      }
    } catch (error) {
      console.warn('Schema validation error:', error);
    }
    
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response && error.response.status >= 500) {
      console.error('Server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
