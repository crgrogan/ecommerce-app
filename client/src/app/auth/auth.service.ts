import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    if (userInfo) {
      const token = userInfo.token;
      // Check whether the token is expired and return
      // true or false
      return !helper.isTokenExpired(token);
    }
    return false;
  }
}
