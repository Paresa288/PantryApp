import { inject, Injectable } from '@angular/core';
import { Location } from '../models/location';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  readonly API_URL = "https://localhost:7157/api/StorageLocations";
  private http = inject(HttpClient);

  getLocations() {
    return this.http.get<Location[]>(this.API_URL);
  }

  createLocation(location:Location) {
    return this.http.post<Location>(this.API_URL, location);
  }
}
