import { Component, OnDestroy } from '@angular/core';
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
export class PaymentComponent implements OnDestroy {
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

  submitPaymentMethodForm({ paymentMethod }) {
    this.store.dispatch(savePaymentMethod(paymentMethod));
    this.route.navigate(['/placeorder']);
  }

  ngOnDestroy() {
    this.shippingSubscription.unsubscribe();
  }
}
