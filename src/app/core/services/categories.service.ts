import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly API_URL = "https://localhost:7157/api/Categories"
  private http = inject(HttpClient);

  getCategories() {
    return this.http.get<Category[]>(this.API_URL);
  }

  createCategory(category: Partial<Category>) {
    return this.http.post<Category>(this.API_URL, category);
  }
}
