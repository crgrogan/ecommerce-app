import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/models/order.model';
import { Product } from 'src/models/product.model';
import {
  clearOrderPaidStatus,
  createOrder,
  createOrderFailed,
  createOrderSuccess,
  getOrderDetails,
  orderDetailsFailed,
  orderDetailsSuccess,
  orderPaidStatusFailed,
  orderPaidStatusSuccess,
  payOrder,
} from '../actions/order.actions';

// new order
export interface CreateOrderState {
  isLoading: boolean;
  success: boolean;
  order: Order;
  err: string;
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

// order details
export interface OrderDetailsState {
  isLoading: boolean;
  order: Order;
  err: string;
}

const initialOrderDetailsState: OrderDetailsState = {
  isLoading: false,
  order: null,
  err: null,
};

export const orderDetailsReducer = createReducer(
  initialOrderDetailsState,
  on(getOrderDetails, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(orderDetailsSuccess, (state, { order }) => {
    return { ...state, order: order, isLoading: false };
  }),
  on(orderDetailsFailed, (state, { error }) => {
    return { ...state, err: error, isLoading: false, order: null };
  })
);

// order paid status
export interface OrderPaidStatusState {
  isLoading: boolean;
  success: boolean;
  err: string;
}

const initialOrderPaidStatusState: OrderPaidStatusState = {
  isLoading: false,
  success: null,
  err: null,
};

export const orderPaidStatusReducer = createReducer(
  initialOrderPaidStatusState,
  on(payOrder, (state) => {
    return { ...state, isLoading: true, err: null, success: null };
  }),
  on(orderPaidStatusSuccess, (state, { order }) => {
    return { ...state, success: true, isLoading: false };
  }),
  on(orderPaidStatusFailed, (state, { error }) => {
    return { ...state, err: error, isLoading: false };
  }),
  on(clearOrderPaidStatus, (state) => {
    return initialOrderPaidStatusState;
  })
);
