import { createAction, props } from '@ngrx/store';

// get all products
export const getProducts = createAction(
  '[Product] Get Products',
  (queryString) => ({ queryString })
);

export const productsLoadedSuccess = createAction(
  '[Product] Products Loaded Success',
  props<{ products }>()
);

export const productsLoadedFailed = createAction(
  '[Product] Products Loaded Failed',
  props<{ error: String }>()
);

// get selected product
export const getProduct = createAction('[Product] Get Product', (id) => ({
  id,
}));

export const productLoadedSuccess = createAction(
  '[Product] Product Loaded Success',
  props<{ product }>()
);

export const productLoadedFailed = createAction(
  '[Product] Product Loaded Failed',
  props<{ error: String }>()
);
