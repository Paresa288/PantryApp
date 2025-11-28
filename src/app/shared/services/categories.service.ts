import { Injectable } from '@angular/core';
import { Category } from '../../types/category';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly API_URL = "https://localhost:7157/api/Categories"

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.API_URL);
  }

  createCategory(category: Category) {
    return this.http.post<Category>(this.API_URL, category);
  }
}
