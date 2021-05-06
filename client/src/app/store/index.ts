import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '../app.state';
import { cartReducer } from './reducers/cart.reducer';
import {
  filtersReducer,
  updateFiltersReducer,
} from './reducers/filters.reducer';
import {
  deleteProductReducer,
  newProductReducer,
  productReducer,
  productsReducer,
} from './reducers/products.reducer';
import { loginReducer, registerReducer } from './reducers/user.reducer';

export const reducers: ActionReducerMap<AppState> = {
  filters: filtersReducer,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  newUser: registerReducer,
  currentUser: loginReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  updateFilters: updateFiltersReducer,
};
