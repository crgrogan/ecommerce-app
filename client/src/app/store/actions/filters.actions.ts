import { createAction, props } from '@ngrx/store';

// get all filters
export const getFilters = createAction('[FILTER] Get Filters');

export const filtersLoadedSuccess = createAction(
  '[FILTER] Filters Loaded Success',
  props<{ filters }>()
);

export const filtersLoadedFailed = createAction(
  '[CATEGORY] Categories Loaded Failed',
  props<{ error: string }>()
);
