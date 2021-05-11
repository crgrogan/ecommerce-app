import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CartState } from '../reducers/cart.reducer';

export const selectCart = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
  selectCart,
  (state: CartState) => state.cartItems
);

export const selectShippingAddress = createSelector(
  selectCart,
  (state: CartState) => state.shippingAddress
);

export const selectPaymentMethod = createSelector(
  selectCart,
  (state: CartState) => state.paymentMethod
);
