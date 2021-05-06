import { createAction, props } from '@ngrx/store';

// get all filters
export const getFilters = createAction('[FILTER] Get Filters');

export const filtersLoadedSuccess = createAction(
  '[FILTERS] Filters Loaded Success',
  props<{ filters }>()
);

export const filtersLoadedFailed = createAction(
  '[FILTERS] Filters Loaded Failed',
  props<{ error: string }>()
);

// add new filters to existing list
export const updateFilters = createAction(
  '[FILTERS] Update Item',
  (filters) => ({
    filters,
  })
);

export const filtersUpdatedSuccess = createAction(
  '[FILTERS] Filters Updated Success',
  props<{ filters }>()
);

export const filtersUpdatedFailed = createAction(
  '[FILTERS] Filters Updated Failed',
  props<{ error: string }>()
);

export const resetFiltersUpdateState = createAction(
  '[PRODUCTS] Reset Save State'
);

// delete filter

export const deleteFilter = createAction(
  '[FILTERS] Delete Filter',
  (id: string, category: string) => ({
    id,
    category,
  })
);

export const filterDeleteSuccess = createAction(
  '[FILTERS] Filter Delete Success',
  props<{ filter }>()
);

export const filterDeleteFailed = createAction(
  '[FILTERS] Filter Delete Failed',
  props<{ error: string }>()
);
