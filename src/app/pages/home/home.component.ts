import { Component, inject, OnInit, signal } from '@angular/core';
import { LocationsService } from '../../shared/services/locations.service';
import { ItemsServiceService } from '../../shared/services/items.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddItemFormComponent } from '../../components/add-item-form/add-item-form.component';
import { Item } from '../../types/item';
import { Location } from '../../types/location';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styles: ''
})

export class HomeComponent implements OnInit {
  items = signal<Item[]>([]);
  locations = signal<Location[]>([]);

  private modalService = inject(NgbModal);
  hidden = signal<boolean>(false);
  
  constructor (public locationsService:LocationsService, public itemsService:ItemsServiceService, public categoriesService:CategoriesService){};
  
  ngOnInit(): void {
    this.getLocations();
    this.getItems();
  };
  
  getItems() {
    this.itemsService.getItems().subscribe({
      next: (res) => {
        this.items.set(res);
      },
      error: (e) => {
        console.log(e);
      }
    });
  };
  
  onCreateItem(item:Item) {
    this.itemsService.createItem(item).subscribe({
      next: (res) => {
        this.items.set([...this.items(), res]);
      },
      error: (e) => {
        console.log("Error creating item:", e);
      }
    });
  };
  
  getLocations() {
    this.locationsService.getLocations().subscribe({
      next: (res) => {
        this.locations.set(res);
      },
      error: (e) => {
        console.error(e);
      }
    });
  };
  
  onDeleteItem(id:number) {
    this.itemsService.deleteItem(id).subscribe({
      next: (res) => {
        console.log("Item deleted successfully:", res);
        this.items.set(this.items().filter(i => i.id !== id)); 
      },
      error: (e) => {
        console.log("Error deleting item:", e);
      }
    });
  };
  
  open() {
    const modalRef = this.modalService.open(AddItemFormComponent, {
      centered: true
    });
    
    modalRef.result.then(
      (item) => {
        if (item == null) return;
        
        this.onCreateItem(item);
        this.items.update(items => [...items, item]);
      },
      (reason) => {
        console.log("Modal dismissed:", reason);
      }
    );
  };

  onClick() {
    this.hidden.set(!this.hidden());
  }
}
