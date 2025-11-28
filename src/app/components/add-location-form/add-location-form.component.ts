import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '../../types/location';
import { LocationsService } from '../../shared/services/locations.service';

@Component({
  selector: 'app-add-location-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-location-form.component.html',
  styles: ''
})
export class AddLocationFormComponent {
  activeModal = inject(NgbActiveModal);
  private locationsService = inject(LocationsService);
  locations = input<Location[]>();

  addLocationForm : FormGroup = new FormGroup({
    locName: new FormControl('', { nonNullable: true }),
    locDescription: new FormControl('', { nonNullable: true }),
    family: new FormGroup({
      id: new FormControl<number | null>(1),
      familyName: new FormControl('', { nonNullable: true }),
      familyDescription: new FormControl('', { nonNullable: true }),
    }),
  });

  onSubmit() {
    const newLoc : Partial<Location> ={
      name: this.addLocationForm.value.locName,
      description: this.addLocationForm.value.locDescription,
      familyId : this.addLocationForm.value.family.id
    }
    console.log(newLoc);
    this.locationsService.createLocation(newLoc as Location).subscribe({
      next: (res) => {
        this.activeModal.close(res);
      },
      error: (e) => {
        console.log("Error creating location:", e);
      }
    })
  }
}
