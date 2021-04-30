import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('http://localhost:5000/api/filters');
  }
}