import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getProductDetails(productId: string, qty: number) {
    return this.http.post(`http://localhost:5000/api/products/${productId}`, {
      qty,
    });
  }
}
