import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  CreateOrderState,
  OrderDetailsState,
  OrderPaidStatusState,
  OrdersState,
  UserOrdersState,
} from '../reducers/order.reducer';

// newly created order
export const selectNewOrder = (state: AppState) => state.newOrder;

export const selectNewOrderError = createSelector(
  selectNewOrder,
  (state: CreateOrderState) => state.err
);

export const selectNewOrderLoading = createSelector(
  selectNewOrder,
  (state: CreateOrderState) => state.isLoading
);

// order details for specific order
export const selectOrderDetails = (state: AppState) => state.orderDetails;

export const selectOrderDetailsInfo = createSelector(
  selectOrderDetails,
  (state: OrderDetailsState) => state.order
);

export const selectOrderDetailsError = createSelector(
  selectOrderDetails,
  (state: OrderDetailsState) => state.err
);

export const selectOrderDetailsLoading = createSelector(
  selectNewOrder,
  (state: OrderDetailsState) => state.isLoading
);

// order paid status
export const selectOrderPaidStatus = (state: AppState) => state.orderPaidStatus;

export const selectOrderPaidStatusSuccess = createSelector(
  selectOrderPaidStatus,
  (state: OrderPaidStatusState) => state.success
);

export const selectOrderPaidStatusLoading = createSelector(
  selectOrderPaidStatus,
  (state: OrderPaidStatusState) => state.isLoading
);

// orders list for specific user
export const selectUserOrders = (state: AppState) => state.userOrders;

export const selectUserOrdersList = createSelector(
  selectUserOrders,
  (state: UserOrdersState) => state.ordersList
);

export const selectUserOrdersListLoading = createSelector(
  selectUserOrders,
  (state: UserOrdersState) => state.isLoading
);

// get all orders
export const selectOrders = (state: AppState) => state.orders;

export const selectOrdersList = createSelector(
  selectOrders,
  (state: OrdersState) => state.ordersList
);

export const selectOrdersListLoading = createSelector(
  selectOrders,
  (state: OrdersState) => state.isLoading
);

export const selectOrdersListFailed = createSelector(
  selectOrders,
  (state: OrdersState) => state.err
);
