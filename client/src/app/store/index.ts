import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '../app.state';
import { cartReducer } from './reducers/cart.reducer';
import { filtersReducer } from './reducers/filters.reducer';
import { productReducer, productsReducer } from './reducers/products.reducer';
import { loginReducer, registerReducer } from './reducers/user.reducer';

export const reducers: ActionReducerMap<AppState> = {
  filters: filtersReducer,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  newUser: registerReducer,
  currentUser: loginReducer,
};