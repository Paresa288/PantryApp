import { Injectable } from '@angular/core';
import { Item } from '../../types/item'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ItemsServiceService {
  readonly API_URL = "https://localhost:7157/api/Items"
  
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<Item[]>(this.API_URL);
  }

  createItem(item: Item) {
    return this.http.post<Item>(this.API_URL, item);
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${this.API_URL}/${itemId}`);
  }
}
