import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // get all products or get filtered list of products based on query string
  getAll(queryString: string, admin: boolean) {
    // if request is from admin, set header to override cache
    if (admin) {
      if (queryString) {
        return this.http.get(`/api/products/filter?${queryString}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
      } else {
        return this.http.get('/api/products', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
      }
    } else {
      if (queryString) {
        return this.http.get(`/api/products/filter?${queryString}`);
      } else {
        return this.http.get('/api/products');
      }
    }
  }

  getSelected(productId: string) {
    return this.http.get(`/api/products/${productId}`);
  }

  createProduct(product: Product) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    if (product._id) {
      // edit product
      return this.http.put(`/api/products/${product._id}`, product, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
    } else {
      // new product
      return this.http.post('/api/products/', product, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
    }
  }

  deleteProduct(id: string) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.delete(`/api/products/${id}`, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
  }
}
