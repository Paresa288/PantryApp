import { inject, Injectable, signal } from '@angular/core';
import { Item } from '../../core/models/item';
import { ItemsService } from '../../core/services/items.service';

@Injectable({
  providedIn: 'root'
})

export class _ItemsService {
  private itemsService = inject(ItemsService)
  private _items = signal<Item[]>([]);
  public items = this._items.asReadonly();
  
  load() : void{
    this.itemsService.getItems().subscribe({
      next: (i) => {
        this._items.set(i);
      }
    })
  }

  create(item: Item) :void{
    this.itemsService.createItem(item).subscribe({
      next: (i) => {
        this._items.update(items => [...items, i]);
      }
    })
  }

  delete(id:number) {
    this.itemsService.deleteItem(id).subscribe({
      next: () => {
        this._items.update((items) => items.filter((item) => {
          item.id != id;
        }))
      }
    })
  }
}
