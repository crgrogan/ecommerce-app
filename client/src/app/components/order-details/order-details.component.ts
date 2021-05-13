import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Observable, Subscription } from 'rxjs';

import { AppState } from 'src/app/app.state';
import {
  clearOrderPaidStatus,
  getOrderDetails,
  orderPaidStatusFailed,
  payOrder,
} from 'src/app/store/actions/order.actions';
import {
  selectOrderDetailsInfo,
  selectOrderPaidStatusSuccess,
} from 'src/app/store/selectors/order.selector';
import { Order } from 'src/models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderId: string;
  /* orderInfo$: Observable<Order>; */
  orderInfoSubscription: Subscription;
  orderInfo: Order;
  orderPaidSuccess$: Observable<boolean>;
  public payPalConfig?: IPayPalConfig;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    // get order id from url
    this.orderId = this.route.snapshot.paramMap.get('id');
    /* this.orderInfo$ = this.store.select(selectOrderDetailsInfo); */
    this.orderInfoSubscription = this.store
      .select(selectOrderDetailsInfo)
      .subscribe((order) => {
        if (order) {
          this.orderInfo = order;
        }
      });
    this.orderPaidSuccess$ = this.store.select(selectOrderPaidStatusSuccess);
  }

  ngOnInit(): void {
    this.store.dispatch(getOrderDetails(this.orderId));
    // render PayPal button
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId:
        'Ace9WtogzsN_pvC51nil7x99NfoLWeqz5TuF1mzZkyDfs-qyEt3ZtFGdr2osodWWCU2kTBjSoPeqszwn',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.orderInfo.totalPrice,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.orderInfo.totalPrice,
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue',
      },
      onClientAuthorization: (data) => {
        this.store.dispatch(payOrder(this.orderId, data));
      },
      onError: (err) => {
        this.store.dispatch(orderPaidStatusFailed({ error: err }));
      },
    };
  }

  ngOnDestroy() {
    this.orderInfoSubscription.unsubscribe();
    // reset order paid state
    this.store.dispatch(clearOrderPaidStatus());
  }
}
