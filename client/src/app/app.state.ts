import { CartState } from './store/reducers/cart.reducer';
import { FiltersState } from './store/reducers/filters.reducer';
import { ProductsState, ProductState } from './store/reducers/products.reducer';
import { UserState } from './store/reducers/user.reducer';

export interface AppState {
  filters: FiltersState;
  products: ProductsState;
  product: ProductState;
  cart: CartState;
  newUser: UserState;
  currentUser: UserState;
}
