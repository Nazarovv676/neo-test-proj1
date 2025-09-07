import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';

const selectCampersState = (state: RootState) => state.campers;

export const selectCampers = createSelector(
  [selectCampersState],
  (campers) => campers.list
);

export const selectFilters = createSelector(
  [selectCampersState],
  (campers) => campers.filters
);

export const selectPagination = createSelector(
  [selectCampersState],
  (campers) => campers.pagination
);

export const selectFavorites = createSelector(
  [selectCampersState],
  (campers) => campers.favorites
);

export const selectIsLoading = createSelector(
  [selectPagination],
  (pagination) => pagination.status === 'loading'
);

export const selectHasError = createSelector(
  [selectPagination],
  (pagination) => pagination.status === 'failed'
);

export const selectError = createSelector(
  [selectPagination],
  (pagination) => pagination.error
);

export const selectHasMore = createSelector(
  [selectPagination],
  (pagination) => pagination.hasMore
);

export const selectCurrentPage = createSelector(
  [selectPagination],
  (pagination) => pagination.page
);

export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    return campers.filter((camper) => {
      // Location filter
      if (
        filters.location &&
        !camper.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Type filter - map domain type to camper form
      if (filters.type) {
        const formMapping: Record<string, string> = {
          'van': 'panelTruck',
          'fully-integrated': 'fullyIntegrated',
          'alcove': 'alcove',
          'panelTruck': 'panelTruck',
        };
        
        const expectedForm = formMapping[filters.type];
        if (expectedForm && camper.details.form !== expectedForm) {
          return false;
        }
      }

      // Features filter
      if (filters.features.length > 0) {
        const camperFeatures = Object.entries(camper.features)
          .filter(([, value]) => value && value > 0)
          .map(([key]) => key);

        const hasAllFeatures = filters.features.every((feature) =>
          camperFeatures.includes(feature)
        );

        if (!hasAllFeatures) {
          return false;
        }
      }

      return true;
    });
  }
);
