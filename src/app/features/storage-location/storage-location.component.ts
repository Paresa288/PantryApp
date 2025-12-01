import { Component, inject, OnInit, signal } from '@angular/core';
import { Item } from '../../core/models/item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { _ItemsService } from '../../shared/services/items.service';
import { Location } from '../../core/models/location';
import { AddItemFormComponent } from '../../shared/components/add-item-form/add-item-form.component';
import { _LocationsService } from '../../shared/services/locations.service';

@Component({
  selector: 'app-storage-location',
  imports: [],
  standalone: true,
  templateUrl: './storage-location.component.html',
  styles: ''
})
export class StorageLocationComponent implements OnInit{
  private modalService = inject(NgbModal);
  hidden = signal<boolean>(false);
  public locationsService = inject(_LocationsService);
  public itemsService = inject(_ItemsService);
  
  ngOnInit(): void {
    this.locationsService.load();
    this.itemsService.load();
  };
  
  onCreateItem(item:Item) {
    this.itemsService.create(item);
  };
  
  onDeleteItem(id:number) {
    this.itemsService.delete(id);
  };
  
  open() {
    const modalRef = this.modalService.open(AddItemFormComponent, {
      centered: true
    });
    
  };

  onClick() {
    this.hidden.set(!this.hidden());
  }
}
