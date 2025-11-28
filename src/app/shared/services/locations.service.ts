import { Injectable } from '@angular/core';
import { Location } from '../../types/location';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  readonly API_URL = "https://localhost:7157/api/StorageLocations";

  constructor(private http : HttpClient) {}

  getLocations() {
    return this.http.get<Location[]>(this.API_URL);
  }

  createLocation(location:Location) {
    return this.http.post<Location>(this.API_URL, location);
  }
}
