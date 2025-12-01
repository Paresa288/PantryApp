import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../../core/services/categories.service';
import { Item } from '../../../core/models/item';
import { Category } from '../../../core/models/category';
import { AddCategoryFormComponent } from '../add-category-form/add-category-form.component';
import { AddLocationFormComponent } from '../add-location-form/add-location-form.component';
import { ItemsService } from '../../../core/services/items.service';
import { _LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlertModule],
  templateUrl: './add-item-form.component.html',
  styles: ''
})
export class AddItemFormComponent implements OnInit {
  private ModalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);
  
  categories = signal<Category[]>([]);

  private itemsService = inject(ItemsService);
  locationsService = inject(_LocationsService);
  private categoriesService = inject(CategoriesService);
  
  addItemForm : FormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    unit: new FormControl('', { nonNullable: true }),
    stock: new FormControl(0, { nonNullable: true }),
    expirationDate: new FormControl('', { nonNullable: true }),
    
    category: new FormGroup({
      id: new FormControl<string | null>(null),
      catName: new FormControl('', { nonNullable: true }),
      catDescription: new FormControl<string | null >(null),
    }), 
    
    location: new FormGroup({
      id: new FormControl<string | null>(null),
      locName: new FormControl('', { nonNullable: true }),
      locDescription: new FormControl('', { nonNullable: true }),
    }),
  });
  
  ngOnInit() : void{
    this.locationsService.load();
    this.loadCategories();
  }
  
  loadCategories() : void{
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });
  }
  
  openAddCategory() :void{
    const modalRef = this.ModalService.open(AddCategoryFormComponent, {
      centered: true,
    });

    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
  }
  
  openAddLocation() :void{
    this.ModalService.open(AddLocationFormComponent, {
      centered: true
    });
  }
  
  onSubmit() :void{
    if (this.addItemForm.invalid) alert("Invalid submission");
  
    const item: Partial<Item> = {
      name: this.addItemForm.value.name,
      unit: this.addItemForm.value.unit,
      expDate: this.addItemForm.value.expirationDate,
      categoryId: this.addItemForm.value.category.id, 
      locationId: this.addItemForm.value.location.id
    };
    console.log(item);
    this.itemsService.createItem(item).subscribe({
      next: (item) => {
        
      },
      error: () => {
        alert("Failed creating new Item. Please try again");
        this.addItemForm.reset();
      }
    })
  };
}
