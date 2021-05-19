import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // get all products or get filtered list of prducts based on query string
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

  createProduct(product: Product) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    if (product._id) {
      return this.http.put(
        `http://localhost:5000/api/products/${product._id}`,
        product,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
    } else {
      return this.http.post('http://localhost:5000/api/products/', product, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
    }
  }

  deleteProduct(id: string) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
  }
}
