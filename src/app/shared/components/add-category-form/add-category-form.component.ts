import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../core/models/category';
import { CategoriesService } from '../../../core/services/categories.service';
@Component({
  selector: 'app-add-category-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category-form.component.html',
  styles: ''
})
export class AddCategoryFormComponent {
  addedCategory = output<Category>();

  activeModal = inject(NgbActiveModal);
  private categoriesService = inject(CategoriesService);

  addCategoryForm : FormGroup = new FormGroup({
    catName: new FormControl('', { nonNullable: true }),
    catDescription: new FormControl('', { nonNullable: true }),
  });

  onSubmit() {
    if(this.addCategoryForm.value.catName == "") {
      alert("Please input a name");
      return;
    }
    
    const newCat : Partial<Category> = {
      name: this.addCategoryForm.value.catName,
      description: this.addCategoryForm.value.catDescription
    }
    
    this.categoriesService.createCategory(newCat).subscribe({
      next: (res) => {
        alert("New category added");
        this.addedCategory.emit(res)
      },
      error: (e) => {
        console.log("Error creating category:", e);
      } 
    });
  }
}
