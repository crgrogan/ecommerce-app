import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getProductDetails(productId: string, qty: number) {
    return this.http.post(`/api/products/${productId}`, {
      qty,
    });
  }
}
