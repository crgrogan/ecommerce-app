import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { createOrder } from 'src/app/store/actions/order.actions';
import { ShippingAddress } from 'src/app/store/reducers/cart.reducer';
import {
  selectCartItems,
  selectShippingAddress,
  selectPaymentMethod,
} from 'src/app/store/selectors/cart.selectors';
import {
  selectNewOrderError,
  selectNewOrderLoading,
} from 'src/app/store/selectors/order.selector';
import { Product } from 'src/models/product.model';
import { GetCartTotalPipe } from '../cart/cart-total.pipe';
import { GetOrderTotalPipe } from './order-total.pipe';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [GetCartTotalPipe, GetOrderTotalPipe],
})
export class OrderComponent {
  shippingAddress$: Observable<ShippingAddress>;
  paymentMethod$: Observable<string>;
  cartItems$: Observable<{}>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  shippingCost: number = 5;

  constructor(
    private store: Store<AppState>,
    private getCartTotal: GetCartTotalPipe,
    private getOrderTotal: GetOrderTotalPipe
  ) {
    this.shippingAddress$ = this.store.select(selectShippingAddress);
    this.paymentMethod$ = this.store.select(selectPaymentMethod);
    this.cartItems$ = this.store.select(selectCartItems);
    this.error$ = this.store.select(selectNewOrderError);
    this.loading$ = this.store.select(selectNewOrderLoading);
  }

  submitOrder(
    cartItems: Product[],
    shippingAddress: ShippingAddress,
    paymentMethod: string
  ) {
    const subtotal = this.getCartTotal.transform(cartItems);
    const totalPrice = this.getOrderTotal.transform(
      subtotal,
      this.shippingCost
    );
    this.store.dispatch(
      createOrder({
        cartItems,
        shippingAddress,
        paymentMethod,
        subtotal,
        shippingCost: this.shippingCost,
        totalPrice,
      })
    );
  }
}
