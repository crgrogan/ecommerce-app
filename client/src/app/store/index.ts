import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '../app.state';
import { cartReducer } from './reducers/cart.reducer';
import {
  filtersReducer,
  updateFiltersReducer,
} from './reducers/filters.reducer';
import {
  createOrderReducer,
  orderDetailsReducer,
  orderPaidStatusReducer,
  ordersListReducer,
  userOrdersReducer,
} from './reducers/order.reducer';
import {
  deleteProductReducer,
  newProductReducer,
  productReducer,
  productsReducer,
} from './reducers/products.reducer';
import {
  deleteUserReducer,
  loginReducer,
  registerReducer,
  updatedUserReducer,
  usersListReducer,
} from './reducers/user.reducer';

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
  newOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPaidStatus: orderPaidStatusReducer,
  userOrders: userOrdersReducer,
  updatedUser: updatedUserReducer,
  users: usersListReducer,
  deleteUser: deleteUserReducer,
  orders: ordersListReducer,
};
