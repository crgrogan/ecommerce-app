import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from 'src/models/product.model';
import {
  getProducts,
  productsLoadedSuccess,
  productsLoadedFailed,
  getProduct,
  productLoadedSuccess,
  productLoadedFailed,
} from '../actions/products.actions';

// all products

export interface ProductsState {
  productsList: Product[];
  isLoading: Boolean;
  err?: String;
}

const initialProductsState: ProductsState = {
  productsList: [],
  isLoading: false,
};

export const productsReducer = createReducer(
  initialProductsState,
  on(getProducts, (state) => {
    return { ...state, isLoading: true };
  }),
  on(productsLoadedSuccess, (state, { products }) => {
    const newState = { ...state, productsList: products, isLoading: false };
    return newState;
  }),
  on(productsLoadedFailed, (state, { error }) => {
    return { ...state, productsList: [], isLoading: false, err: error };
  })
);

// selected product

export interface ProductState {
  selectedProduct: Product | null;
  isLoading: Boolean;
  err?: String;
}

const initialProductState: ProductState = {
  selectedProduct: null,
  isLoading: false,
};

export const productReducer = createReducer(
  initialProductState,
  on(getProduct, (state) => {
    return { ...state, isLoading: true };
  }),
  on(productLoadedSuccess, (state, { product }) => {
    const newState = { ...state, selectedProduct: product, isLoading: false };
    return newState;
  }),
  on(productLoadedFailed, (state, { error }) => {
    return { ...state, selectedProduct: null, isLoading: false, err: error };
  })
);
