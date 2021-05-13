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
  getOrderDetails,
  orderDetailsSuccess,
  orderDetailsFailed,
  payOrder,
  orderPaidStatusSuccess,
  orderPaidStatusFailed,
  getUserOrders,
  userOrdersSuccess,
  userOrdersFailed,
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

  getOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderDetails),
      switchMap((action) =>
        this.orderService.getOrderDetails(action.id).pipe(
          map((data) => orderDetailsSuccess({ order: data })),
          catchError((err) => of(orderDetailsFailed({ error: err.error.msg })))
        )
      )
    )
  );

  // update order paid status
  payOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(payOrder),
      switchMap((action) =>
        this.orderService.payOrder(action.id, action.paymentDetails).pipe(
          switchMap((data) => {
            return [
              orderPaidStatusSuccess({ order: data }),
              orderDetailsSuccess({ order: data }),
            ];
          }),
          catchError((err) =>
            of(orderPaidStatusFailed({ error: err.error.msg }))
          )
        )
      )
    )
  );

  userOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserOrders),
      switchMap((action) =>
        this.orderService.getUserOrders().pipe(
          map((data) => userOrdersSuccess({ orders: data })),
          catchError((err) => of(userOrdersFailed({ error: err.error.msg })))
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
