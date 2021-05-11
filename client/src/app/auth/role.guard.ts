import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { User } from 'src/models/user.model';

// check if user is logged in and is an administrator
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    if (!userInfo) {
      this.router.navigate(['login']);
      return false;
    }
    const token = userInfo.token;
    // decode the token to get its payload
    const tokenPayload: User = decode(token);
    if (!this.auth.isAuthenticated() || !tokenPayload.isAdmin) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
