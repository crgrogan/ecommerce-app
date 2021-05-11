import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { savePaymentMethod } from 'src/app/store/actions/cart.actions';
import { selectShippingAddress } from 'src/app/store/selectors/cart.selectors';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  paymentMethod: string = 'PayPal';
  shippingSubscription: Subscription;

  constructor(private store: Store<AppState>, private route: Router) {
    this.shippingSubscription = this.store
      .select(selectShippingAddress)
      .subscribe((shippingDetails) => {
        if (!shippingDetails) {
          this.route.navigate(['/shipping']);
        }
      });
  }

  ngOnInit(): void {}

  submitPaymentMethodForm({ paymentMethod }) {
    this.store.dispatch(savePaymentMethod(paymentMethod));
    this.route.navigate(['/order']);
  }

  ngOnDestroy() {
    this.shippingSubscription.unsubscribe();
  }
}
