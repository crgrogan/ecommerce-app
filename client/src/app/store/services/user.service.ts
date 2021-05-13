import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string }) {
    return this.http.post('http://localhost:5000/api/users/register', user);
  }

  login(user: { email: string; password: string }) {
    return this.http.post('http://localhost:5000/api/users/login', user);
  }

  update(userDetails: { name: string; email: string; password: string }) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    if (!userDetails.password) {
      return this.http.put(
        `http://localhost:5000/api/users/profile/details`,
        userDetails,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
    } else {
      return this.http.put(
        `http://localhost:5000/api/users/profile/password`,
        userDetails,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
    }
  }
}
