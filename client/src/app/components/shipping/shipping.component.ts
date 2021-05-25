import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { saveShippingAddress } from 'src/app/store/actions/cart.actions';
import { selectShippingAddress } from 'src/app/store/selectors/cart.selectors';
import { selectCurrentUserInfo } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
})
export class ShippingComponent implements OnDestroy {
  name: string = '';
  address: string = '';
  city: string = '';
  county: string = '';
  postalCode: string = '';
  country: string = '';
  userSubscription: Subscription;
  shippingSubscription: Subscription;

  constructor(private store: Store<AppState>, private route: Router) {
    // if no current user redirect to login page
    this.userSubscription = this.store
      .select(selectCurrentUserInfo)
      .subscribe((user) => {
        if (!user) {
          this.route.navigate(['login'], {
            state: { redirect: this.route.url },
          });
        } else {
          this.name = user.name;
        }
      });
    // set initial form values to cart shipping details from store
    this.shippingSubscription = this.store
      .select(selectShippingAddress)
      .subscribe((shippingDetails) => {
        if (shippingDetails) {
          this.name = shippingDetails.name;
          this.address = shippingDetails.address;
          this.city = shippingDetails.city;
          this.county = shippingDetails.county;
          this.postalCode = shippingDetails.postalCode;
          this.country = shippingDetails.country;
        }
      });
  }

  submitShippingForm({ name, address, city, county, postalCode, country }) {
    // save shipping address to store
    this.store.dispatch(
      saveShippingAddress({ name, address, city, county, postalCode, country })
    );
    // go to payment screen
    this.route.navigate(['/payment']);
  }

  ngOnDestroy() {
    // unsubscibe
    this.userSubscription.unsubscribe();
    this.shippingSubscription.unsubscribe();
  }
}
