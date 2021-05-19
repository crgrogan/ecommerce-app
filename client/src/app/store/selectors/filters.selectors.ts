import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FiltersState, UpdateFiltersState } from '../reducers/filters.reducer';

export const selectFilters = (state: AppState) => state.filters;

export const selectFiltersLoading = createSelector(
  selectFilters,
  (state: FiltersState) => state.isLoading
);

export const selectCategoriesList = createSelector(
  selectFilters,
  (state: FiltersState) => state.categoriesList
);

export const selectBrandsList = createSelector(
  selectFilters,
  (state: FiltersState) => state.brandsList
);

export const selectColoursList = createSelector(
  selectFilters,
  (state: FiltersState) => state.coloursList
);

// create/update filters

export const selectUpdateFilters = (state: AppState) => state.updateFilters;

export const selectUpdateFiltersLoading = createSelector(
  selectUpdateFilters,
  (state: UpdateFiltersState) => state.isLoading
);

export const selectUpdateFiltersError = createSelector(
  selectUpdateFilters,
  (state: UpdateFiltersState) => state.err
);

export const selectUpdateFiltersMsg = createSelector(
  selectUpdateFilters,
  (state: UpdateFiltersState) => state.msg
);
