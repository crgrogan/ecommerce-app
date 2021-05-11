import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { clearCart } from '../actions/cart.actions';
import {
  createOrder,
  createOrderSuccess,
  createOrderFailed,
} from '../actions/order.actions';
import { OrderService } from '../services/order.service';

@Injectable()
export class OrderEffects {
  // create a new order
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrder),
      switchMap((action) =>
        this.orderService.createNewOrder(action.order).pipe(
          switchMap((data: { msg: string; data }) => {
            this.router.navigate([`/order/${data.data._id}`]);
            return [createOrderSuccess({ newOrder: data }), clearCart()];
          }),
          catchError((err) => of(createOrderFailed({ error: err.error.msg })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private router: Router
  ) {}
}
