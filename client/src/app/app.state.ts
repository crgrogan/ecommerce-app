import { CartState } from './store/reducers/cart.reducer';
import { FiltersState } from './store/reducers/filters.reducer';
import { ProductsState, ProductState } from './store/reducers/products.reducer';

export interface AppState {
  filters: FiltersState;
  products: ProductsState;
  product: ProductState;
  cart: CartState;
}
