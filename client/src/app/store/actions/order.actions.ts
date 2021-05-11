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
