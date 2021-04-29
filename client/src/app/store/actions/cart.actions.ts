import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('[CART] Add To Cart', (id, qty) => ({
  id,
  qty,
}));

export const addItemSuccess = createAction(
  '[CART] Add Item Success',
  props<{ newItem }>()
);

export const removeCartItem = createAction('[CART] Remove Item', (id) => ({
  id,
}));

export const updateQty = createAction('[CART] Update Qty', (id, qty) => ({
  id,
  qty,
}));

export const cartError = createAction(
  '[CART] Cart Error',
  props<{ error: string }>()
);
