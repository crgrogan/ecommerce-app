import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/models/product.model';
import {
  createOrder,
  createOrderFailed,
  createOrderSuccess,
} from '../actions/order.actions';

export interface CreateOrderState {
  isLoading: boolean;
  success: boolean;
  order;
  err;
}

const initialCreateOrderState: CreateOrderState = {
  isLoading: false,
  success: false,
  order: null,
  err: null,
};

export const createOrderReducer = createReducer(
  initialCreateOrderState,
  on(createOrder, (state) => {
    return { ...state, isLoading: true, err: null, success: false };
  }),
  on(createOrderSuccess, (state, { newOrder }) => {
    return { ...state, success: true, order: newOrder.data, isLoading: false };
  }),
  on(createOrderFailed, (state, { error }) => {
    return { ...state, err: error, isLoading: false, order: null };
  })
);
