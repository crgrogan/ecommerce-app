import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { CreateOrderState } from '../reducers/order.reducer';

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
