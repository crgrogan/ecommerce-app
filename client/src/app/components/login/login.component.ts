import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import {
  loginPageUnloaded,
  loginUser,
} from 'src/app/store/actions/user.actions';
import {
  selectCurrentUserInfo,
  selectCurrentUserLoading,
  selectCurrentUserError,
} from 'src/app/store/selectors/user.selectors';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading$: Observable<boolean>;
  error$: Observable<string>;
  redirectUrl: string;

  constructor(private store: Store<AppState>, private router: Router) {
    this.error$ = this.store.select(selectCurrentUserError);
    this.loading$ = this.store.select(selectCurrentUserLoading);
    const { redirect } = window.history.state;
    this.redirectUrl = redirect;
  }

  ngOnInit(): void {
    // if user is logged in, redirect to profile page
    this.store
      .select(selectCurrentUserInfo)
      .subscribe((user) => {
        if (user) this.router.navigate(['/profile']);
      })
      .unsubscribe();
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(
        loginUser(form.value.email, form.value.password, this.redirectUrl)
      );
    }
    // reset form values and state
    form.resetForm();
  }

  ngOnDestroy(): void {
    // set error state in store back to null
    this.store.dispatch(loginPageUnloaded());
  }
}
