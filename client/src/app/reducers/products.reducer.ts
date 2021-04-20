import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from 'src/models/product.model';
import {
  getProducts,
  productsLoadedSuccess,
  productsLoadedFailed,
} from '../actions/products.actions';

const initialState: {
  productsList: Product[];
  isLoading: Boolean;
  err?: String;
} = {
  productsList: [],
  isLoading: false,
};

export const productsReducer = createReducer(
  initialState,
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
