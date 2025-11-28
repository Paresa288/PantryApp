import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../types/category';

@Component({
  selector: 'app-add-category-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category-form.component.html',
  styles: ''
})
export class AddCategoryFormComponent {
  activeModal = inject(NgbActiveModal);

  addCategoryForm : FormGroup = new FormGroup({
    catName: new FormControl('', { nonNullable: true }),
    catDescription: new FormControl('', { nonNullable: true }),
  });

  onSubmit() {
    const newCat : Partial<Category> = {
      name: this.addCategoryForm.value.catName,
      description: this.addCategoryForm.value.catDescription
    }
    this.activeModal.close(newCat);
  }
}
