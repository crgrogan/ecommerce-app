import { createAction, props } from '@ngrx/store';
import { Order } from 'src/models/order.model';

export const createOrder = createAction(
  '[ORDER] Create Order',
  (order: Order) => ({
    order,
  })
);

export const createOrderSuccess = createAction(
  '[ORDER] Create Order Success',
  props<{ newOrder }>()
);

export const createOrderFailed = createAction(
  '[ORDER] Create Order Failed',
  props<{ error: string }>()
);

// get details of a specific order
export const getOrderDetails = createAction(
  '[ORDER] Get Order Details',
  (id: string) => ({
    id,
  })
);

export const orderDetailsSuccess = createAction(
  '[ORDER] Order Details Success',
  props<{ order }>()
);

export const orderDetailsFailed = createAction(
  '[ORDER] Order Details Failed',
  props<{ error: string }>()
);

// update order paid status
export const payOrder = createAction(
  '[ORDER] Pay Order',
  (id: string, data) => ({
    id,
    paymentDetails: data,
  })
);

export const orderPaidStatusSuccess = createAction(
  '[ORDER] Order Paid Status Success',
  props<{ order }>()
);

export const orderPaidStatusFailed = createAction(
  '[ORDER] Order Paid Status Failed',
  props<{ error: string }>()
);

// reset order paid state
export const clearOrderPaidStatus = createAction(
  '[ORDER] Clear Order Paid Status'
);

// get all orders for current user
export const getUserOrders = createAction('[ORDER] Get User Orders');

export const userOrdersSuccess = createAction(
  '[ORDER] User Orders Success',
  props<{ orders }>()
);

export const userOrdersFailed = createAction(
  '[ORDER] User Orders Failed',
  props<{ error: string }>()
);
