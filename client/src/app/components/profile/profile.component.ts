import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getUserOrders } from 'src/app/store/actions/order.actions';
import {
  logoutUser,
  updateUserDetails,
  clearUpdateUser,
} from 'src/app/store/actions/user.actions';
import {
  selectUserOrdersList,
  selectUserOrdersListLoading,
} from 'src/app/store/selectors/order.selector';
import {
  selectCurrentUserInfo,
  selectUpdateUserError,
  selectUpdateUserLoading,
  selectUpdateUserSuccess,
  selectUpdateUserField,
} from 'src/app/store/selectors/user.selectors';
import { Order } from 'src/models/order.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user: User;
  updateUserLoading$: Observable<boolean>;
  updateUserError$: Observable<string>;
  updateUserSuccess$: Observable<string>;
  fieldSubscription: Subscription;
  updateUserField: string;
  userOrdersList$: Observable<Order[]>;
  userOrdersListLoading$: Observable<boolean>;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private store: Store<AppState>, private router: Router) {
    this.userOrdersList$ = this.store.select(selectUserOrdersList);
    this.userOrdersListLoading$ = this.store.select(
      selectUserOrdersListLoading
    );
    this.userSubscription = this.store
      .select(selectCurrentUserInfo)
      .subscribe((userInfo) => {
        if (userInfo) {
          this.user = userInfo;
          this.name = userInfo.name;
          this.email = userInfo.email;
        }
      });
    this.updateUserError$ = this.store.select(selectUpdateUserError);
    this.updateUserLoading$ = this.store.select(selectUpdateUserLoading);
    this.updateUserSuccess$ = this.store.select(selectUpdateUserSuccess);
    this.fieldSubscription = this.store
      .select(selectUpdateUserField)
      .subscribe((field) => (this.updateUserField = field));
  }

  ngOnInit(): void {
    // get user's previous orders
    this.store.dispatch(getUserOrders());
  }

  // submit form to change user's name and/or email
  submitUserInfoForm(form: NgForm) {
    this.store.dispatch(
      updateUserDetails(form.value.name, form.value.email, null)
    );
    // reset form values and state
    form.resetForm();
  }

  // submit form to change user's password
  submitPasswordForm(form: NgForm) {
    this.store.dispatch(updateUserDetails(null, null, form.value.password));
    // reset form values and state
    form.resetForm();
  }

  // go to order details page for selected product
  goToOrderDetails(id: string) {
    this.router.navigate(['/order', id]);
  }

  // go to management page
  goToManagement() {
    this.router.navigate(['/management']);
  }

  logoutUser() {
    this.store.dispatch(logoutUser());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.fieldSubscription.unsubscribe();
    // set state in update user reducer back to initial state
    this.store.dispatch(clearUpdateUser());
  }
}
