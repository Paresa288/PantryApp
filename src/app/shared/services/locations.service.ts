import { inject, Injectable, signal } from '@angular/core';
import { LocationsService } from '../../core/services/locations.service';
import { Location } from '../../core/models/location';

@Injectable({
  providedIn: 'root'
})

export class _LocationsService {
  private locationsService = inject(LocationsService);
  private _locations = signal<Location[]>([]);
  public locations = this._locations.asReadonly();

  load () {
    this.locationsService.getLocations().subscribe({
      next: (locs) => {
        this._locations.set(locs)
      }
    })
  }

  create (loc: Location) {
    this.locationsService.createLocation(loc).subscribe({
      next: (loc) => {
        this._locations.update((locs) => [...locs, loc]);
      }
    })
  }
}
