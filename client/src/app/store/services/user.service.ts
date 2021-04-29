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
}
