import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/models/product.model';
import {
  getProducts,
  productsLoadedSuccess,
  productsLoadedFailed,
  getProduct,
  productLoadedSuccess,
  productLoadedFailed,
  saveProduct,
  productSaveSuccess,
  productSaveFailed,
  resetSaveState,
  deleteProduct,
  productDeleteSuccess,
  productDeleteFailed,
} from '../actions/products.actions';

// all products
export interface ProductsState {
  productsList: Product[];
  isLoading: boolean;
  err?: string;
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
  isLoading: boolean;
  err?: string;
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

// create/update product

export interface NewProductState {
  success: boolean;
  product: Product | null;
  isLoading: boolean;
  err: string;
  msg: string;
}

const initialNewProductState: NewProductState = {
  success: false,
  isLoading: false,
  err: null,
  product: null,
  msg: '',
};

export const newProductReducer = createReducer(
  initialNewProductState,
  on(saveProduct, (state) => {
    return { ...state, isLoading: true, err: null, success: false, msg: null };
  }),
  on(productSaveSuccess, (state, { product }) => {
    const newState = {
      ...state,
      isLoading: false,
      success: true,
      product: product.data,
      msg: product.msg,
    };
    return newState;
  }),
  on(resetSaveState, (state) => {
    return initialNewProductState;
  }),
  on(productSaveFailed, (state, { error }) => {
    return {
      ...state,
      product: null,
      isLoading: false,
      err: error,
      success: false,
    };
  })
);

// delete product

export interface DeleteProductState {
  success: boolean;
  isLoading: boolean;
  err: string;
}

const initialDeleteProductState: DeleteProductState = {
  success: false,
  isLoading: false,
  err: null,
};

export const deleteProductReducer = createReducer(
  initialDeleteProductState,
  on(deleteProduct, (state) => {
    return { ...state, isLoading: true, success: false };
  }),
  on(productDeleteSuccess, (state, { product }) => {
    return {
      ...state,
      isLoading: false,
      success: true,
    };
  }),
  on(productDeleteFailed, (state, { error }) => {
    return { ...state, isLoading: false, err: error };
  })
);
