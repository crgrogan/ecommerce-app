import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // create new order on server
  createNewOrder(order: Order) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post('http://localhost:5000/api/orders', order, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
  }
}
