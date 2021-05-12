import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  CreateOrderState,
  OrderDetailsState,
  OrderPaidStatusState,
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
