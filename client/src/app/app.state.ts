import { CartState } from './store/reducers/cart.reducer';
import { FiltersState } from './store/reducers/filters.reducer';
import {
  DeleteProductState,
  NewProductState,
  ProductsState,
  ProductState,
} from './store/reducers/products.reducer';
import { UserState } from './store/reducers/user.reducer';

export interface AppState {
  filters: FiltersState;
  products: ProductsState;
  product: ProductState;
  cart: CartState;
  newUser: UserState;
  currentUser: UserState;
  newProduct: NewProductState;
  deleteProduct: DeleteProductState;
}
