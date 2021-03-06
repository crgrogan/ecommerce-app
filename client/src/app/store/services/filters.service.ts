import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private http: HttpClient) {}

  getAll(admin: boolean) {
    if (admin) {
      // if request is from admin, set header
      //  to override cache
      return this.http.get('/api/filters', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
    } else {
      return this.http.get('/api/filters');
    }
  }

  // add new filters to existing list
  update(filters) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    const { category, brand, colour } = filters;
    return this.http.post(
      '/api/filters',
      {
        category,
        brand,
        colour,
      },
      { headers: { authorization: `Bearer ${userInfo.token}` } }
    );
  }

  // delete filter
  delete(id: string, category: string) {
    const { userInfo } = JSON.parse(localStorage.getItem('currentUser'));
    // use put request as httpClient doesn't allow body to be sent in delete request
    return this.http.put(
      `/api/filters/${id}`,
      { category },
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );
  }
}
