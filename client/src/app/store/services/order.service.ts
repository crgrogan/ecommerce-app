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
    return this.http.post('/api/orders', order, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
  }

  // get details of order based on id provided
  getOrderDetails(id: string) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/api/orders/${id}`, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
  }

  payOrder(id: string, paymentDetails) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.put(`/api/orders/${id}`, paymentDetails, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
  }

  // get all orders for current user
  getUserOrders() {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/api/orders/list/${userInfo._id}`, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
  }

  // get orders for all users
  getAllOrders() {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/api/orders`, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
  }
}
