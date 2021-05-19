import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  NewProductState,
  ProductsState,
  ProductState,
} from '../reducers/products.reducer';

// all products
export const selectProducts = (state: AppState) => state.products;

export const selectProductsList = createSelector(
  selectProducts,
  (state: ProductsState) => state.productsList
);

export const selectProductsListLoading = createSelector(
  selectProducts,
  (state: ProductsState) => state.isLoading
);

// selected product
export const selectProduct = (state: AppState) => state.product;

export const selectSelectedProduct = createSelector(
  selectProduct,
  (state: ProductState) => state.selectedProduct
);

export const selectSelectedProductLoading = createSelector(
  selectProduct,
  (state: ProductState) => state.isLoading
);

// created/updated product
export const selectNewProduct = (state: AppState) => state.newProduct;

export const selectNewProductMsg = createSelector(
  selectNewProduct,
  (state: NewProductState) => state.msg
);

export const selectNewProductErr = createSelector(
  selectNewProduct,
  (state: NewProductState) => state.err
);

export const selectNewProductLoading = createSelector(
  selectNewProduct,
  (state: NewProductState) => state.isLoading
);
