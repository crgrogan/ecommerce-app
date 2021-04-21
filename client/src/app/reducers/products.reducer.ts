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

const initialProductsState: {
  productsList: Product[];
  isLoading: Boolean;
  err?: String;
} = {
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

const initialProductState: {
  selectedProduct: Product | null;
  isLoading: Boolean;
  err?: String;
} = {
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
