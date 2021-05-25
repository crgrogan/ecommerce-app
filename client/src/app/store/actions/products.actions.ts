import { createAction, props } from '@ngrx/store';
import { Product } from 'src/models/product.model';

// get all products
export const getProducts = createAction(
  '[PRODUCTS] Get Products',
  (queryString, admin) => ({ queryString, admin })
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

// management screen actions

// add/update product

export const saveProduct = createAction(
  '[PRODUCTS] Save Product',
  (product: Product) => ({
    payload: product,
  })
);

export const productSaveSuccess = createAction(
  '[PRODUCTS] Product Save Success',
  props<{ product }>()
);

export const productSaveFailed = createAction(
  '[PRODUCTS] Product Save Failed',
  props<{ error: string }>()
);

// delete product

export const deleteProduct = createAction(
  '[PRODUCTS] Delete Product',
  (id: string) => ({
    id,
  })
);

export const productDeleteSuccess = createAction(
  '[PRODUCTS] Product Delete Success',
  props<{ product }>()
);

export const productDeleteFailed = createAction(
  '[PRODUCTS] Product Delete Failed',
  props<{ error: string }>()
);

export const resetSaveState = createAction('[PRODUCTS] Reset Save State');
