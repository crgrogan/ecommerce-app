import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/models/order.model';
import { Product } from 'src/models/product.model';
import {
  clearOrderPaidStatus,
  createOrder,
  createOrderFailed,
  createOrderSuccess,
  getOrderDetails,
  getOrders,
  getUserOrders,
  orderDetailsFailed,
  orderDetailsSuccess,
  orderPaidStatusFailed,
  orderPaidStatusSuccess,
  ordersLoadedFailed,
  ordersLoadedSuccess,
  payOrder,
  userOrdersFailed,
  userOrdersSuccess,
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

// user orders

// order paid status
export interface UserOrdersState {
  isLoading: boolean;
  ordersList: Order[];
  err: string;
}

const initialUserOrdersState: UserOrdersState = {
  isLoading: false,
  ordersList: [],
  err: null,
};

export const userOrdersReducer = createReducer(
  initialUserOrdersState,
  on(getUserOrders, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(userOrdersSuccess, (state, { orders }) => {
    return { ...state, ordersList: orders, isLoading: false };
  }),
  on(userOrdersFailed, (state, { error }) => {
    return { ...state, err: error, isLoading: false, ordersList: [] };
  })
);

// orders list
export interface OrdersState {
  ordersList: Order[];
  isLoading: boolean;
  err: string;
}

const initialOrdersListState: OrdersState = {
  ordersList: [],
  isLoading: false,
  err: null,
};

export const ordersListReducer = createReducer(
  initialOrdersListState,
  on(getOrders, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(ordersLoadedSuccess, (state, { orders }) => {
    return {
      ...state,
      ordersList: orders,
      isLoading: false,
    };
  }),
  on(ordersLoadedFailed, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      err: error,
      ordersList: [],
    };
  })
);
