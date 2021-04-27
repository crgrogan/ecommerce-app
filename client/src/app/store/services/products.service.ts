import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAll(queryString: string) {
    if (queryString) {
      return this.http.get(
        `http://localhost:5000/api/products/filter?${queryString}`
      );
    } else {
      return this.http.get('http://localhost:5000/api/products');
    }
  }

  getSelected(productId: string) {
    return this.http.get(`http://localhost:5000/api/products/${productId}`);
  }
}
