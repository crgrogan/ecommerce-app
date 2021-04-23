import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '../app.state';
import { cartReducer } from './reducers/cart.reducer';
import { filtersReducer } from './reducers/filters.reducer';
import { productReducer, productsReducer } from './reducers/products.reducer';

/* export interface RootState {
  filters: FiltersState;
  products: ProductsState;
  product: ProductState;
  cart: CartState;
} */

export const reducers: ActionReducerMap<AppState> = {
  filters: filtersReducer,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
};
