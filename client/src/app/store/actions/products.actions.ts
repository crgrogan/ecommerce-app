import { createAction, props } from '@ngrx/store';

// get all products
export const getProducts = createAction(
  '[PRODUCTS] Get Products',
  (queryString) => ({ queryString })
);

export const productsLoadedSuccess = createAction(
  '[PRODUCTS] Products Loaded Success',
  props<{ products }>()
);

export const productsLoadedFailed = createAction(
  '[PRODUCTS] Products Loaded Failed',
  props<{ error: string }>()
);

// get selected product
export const getProduct = createAction('[PRODUCTS] Get Product', (id) => ({
  id,
}));

export const productLoadedSuccess = createAction(
  '[PRODUCTS] Product Loaded Success',
  props<{ product }>()
);

export const productLoadedFailed = createAction(
  '[PRODUCTS] Product Loaded Failed',
  props<{ error: string }>()
);
