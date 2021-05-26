import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUser } from '../store/actions/user.actions';
import { AuthService } from './auth.service';

// check if user is logged in
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public store: Store) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      // logout user in order to clear current
      // user details and redirect to login page
      this.store.dispatch(logoutUser());
      return false;
    }
    return true;
  }
}
