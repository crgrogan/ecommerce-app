import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  mergeMap,
  concatMap,
} from 'rxjs/operators';
import {
  addToCart,
  addItemSuccess,
  cartError,
  removeCartItem,
} from '../actions/cart.actions';
import { CartService } from '../services/cart.service';

@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      switchMap((action) =>
        this.cartService.getProductDetails(action.id, action.qty).pipe(
          map((data) => addItemSuccess({ newItem: data })),
          catchError((err) => of(cartError({ error: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private cartService: CartService) {}
}
