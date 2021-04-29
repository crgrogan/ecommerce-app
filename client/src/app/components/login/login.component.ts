import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loginPageUnloaded,
  loginUser,
} from 'src/app/store/actions/user.actions';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading$: Observable<boolean>;
  error$: Observable<string>;
  sub;

  constructor(
    private store: Store<{
      currentUser: { userInfo: User; isLoading: boolean; err: string };
    }>,
    private router: Router
  ) {
    this.error$ = this.store.select((state) => state.currentUser.err);
    this.loading$ = this.store.select((state) => state.currentUser.isLoading);
  }

  ngOnInit(): void {
    // if user is logged in, redirect to profile page
    this.sub = this.store
      .select((state) => state.currentUser.userInfo)
      .subscribe((user) => {
        if (user) this.router.navigate(['/profile']);
      })
      .unsubscribe();
  }

  onSubmit(data: { email: string; password: string }) {
    this.store.dispatch(loginUser(data.email, data.password));
  }

  ngOnDestroy(): void {
    // set error state in store back to null
    this.store.dispatch(loginPageUnloaded());
  }
}
