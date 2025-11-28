import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocationsService } from '../../shared/services/locations.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../shared/services/categories.service';
import { Item } from '../../types/item';
import { Category } from '../../types/category';
import { Location } from '../../types/location';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AddCategoryFormComponent } from '../add-category-form/add-category-form.component';
import { AddLocationFormComponent } from '../add-location-form/add-location-form.component';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-item-form.component.html',
  styles: ''
})
export class AddItemFormComponent implements OnInit {
  private ModalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  categories = signal<Category[]>([]);
  filteredCategories = signal<Category[]>([]);
  locations = signal<Location[]>([]);
  filteredLocations = signal<Location[]>([]);

  private locationsService = inject(LocationsService);
  private categoriesService = inject(CategoriesService);
  
  // Formulario reactivo
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
    this.loadLocations();
    this.loadCategories();
    
    this.addItemForm.get('category.catName')?.valueChanges
    .pipe(debounceTime(200), distinctUntilChanged())
    .subscribe(query => {
      this.filterCategories(query || '')
    });
  }
  
  loadCategories() {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories.set(cats);
      this.filterCategories(this.addItemForm.get('category.catName')?.value || '');
    });
  }
  
  loadLocations() {
    this.locationsService.getLocations().subscribe( locs => {
      this.locations.set(locs);
    });
  }
 
  private filterCategories(query: string) {
    const _query = query.toLowerCase().trim();
    if (!_query) {
      this.filteredCategories.set([]);
      return;
    }
    this.filteredCategories.set(
      this.categories().filter(c => c.name.toLowerCase().includes(_query))
    );
  }

  onSubmit() {
    if (this.addItemForm.invalid) return;

    const item: Partial<Item> = {
      name: this.addItemForm.value.name,
      unit: this.addItemForm.value.unit,
      expDate: this.addItemForm.value.expirationDate,
      categoryId: this.addItemForm.value.category.id, 
      locationId: this.addItemForm.value.location.id
    };
    this.activeModal.close(item);
  };

  openAddCategory() {
    const modalRef = this.ModalService.open(AddCategoryFormComponent, {
      centered: true
    });
    modalRef.result.then(category => {
      console.log(category);
      this.categoriesService.createCategory(category).subscribe({
        next: (res) => {
          this.categories.update(categories => [...categories, res]);
        },
        error: (e) => {
          console.log("Error creating category:", e);
        } 
      });
    });
  }

  oppenAddLocation() {
    this.ModalService.open(AddLocationFormComponent, {
      centered: true
    });
  }
}
