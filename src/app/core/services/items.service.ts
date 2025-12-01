import { inject, Injectable } from '@angular/core';
import { Item } from '../models/item'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  readonly API_URL = "https://localhost:7157/api/Items"
  private http = inject(HttpClient);

  getItems() {
    return this.http.get<Item[]>(this.API_URL);
  }

  createItem(item: Partial<Item>) {
    return this.http.post<Item>(this.API_URL, item);
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${this.API_URL}/${itemId}`);
  }
}
