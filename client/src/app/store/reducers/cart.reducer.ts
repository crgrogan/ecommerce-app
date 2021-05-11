import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/models/product.model';
import {
  addItemSuccess,
  cartError,
  removeCartItem,
  updateQty,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} from '../actions/cart.actions';
import { logoutUser } from '../actions/user.actions';

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  country: string;
}

export interface CartState {
  cartItems: Product[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  err?: string;
}

const initialCartState: CartState = {
  cartItems: [],
  shippingAddress: null,
  paymentMethod: null,
  err: null,
};

export const cartReducer = createReducer(
  initialCartState,
  on(addItemSuccess, (state, { newItem }) => {
    const match = [...state.cartItems].find((item) => item._id == newItem._id);
    if (match) {
      const newCart = [...state.cartItems].map((item) =>
        item._id == newItem._id
          ? { ...item, qty: item.qty + newItem.qty }
          : { ...item }
      );
      return { ...state, cartItems: newCart };
    } else {
      const newCart = [...state.cartItems, newItem];
      return { ...state, cartItems: newCart };
    }
  }),
  on(removeCartItem, (state, { id }) => {
    const newCart = [...state.cartItems].filter((item) => item._id !== id);
    return { ...state, cartItems: newCart };
  }),
  on(updateQty, (state, { id, qty }) => {
    const updatedCart = [...state.cartItems].map((item) =>
      item._id == id ? { ...item, qty } : { ...item }
    );
    return { ...state, cartItems: updatedCart };
  }),
  on(saveShippingAddress, (state, { shippingDetails }) => {
    return { ...state, shippingAddress: shippingDetails };
  }),
  on(savePaymentMethod, (state, { method }) => {
    return { ...state, paymentMethod: method };
  }),
  on(cartError, (state, { error }) => {
    return { ...state, cartItems: [], err: error };
  }),
  on(logoutUser, clearCart, (state) => {
    return initialCartState;
  })
);
