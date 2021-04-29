import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from 'src/models/product.model';
import {
  addToCart,
  addItemSuccess,
  cartError,
  removeCartItem,
  updateQty,
} from '../actions/cart.actions';

export interface CartState {
  cartItems: Product[];
  err?: string;
}

const initialCartState: CartState = {
  cartItems: [],
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
  on(cartError, (state, { error }) => {
    return { ...state, cartItems: [], err: error };
  })
);
