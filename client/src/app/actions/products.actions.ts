import { createAction, props } from '@ngrx/store';

// get all categories
export const getProducts = createAction('[Product] Get Products');

export const productsLoadedSuccess = createAction(
  '[Product] Products Loaded Success',
  props<{ products }>()
);

export const productsLoadedFailed = createAction(
  '[Product] Products Loaded Failed',
  props<{ error: String }>()
);
