import { Routes } from '@angular/router';
import { UserComponent } from './core/user/user.component';
import { StorageLocationComponent } from './features/storage-location/storage-location.component';
export const routes: Routes = [
  {path: '', redirectTo: '/:userId/:familyId', pathMatch: 'full' },
  {path: ':userId/:familyId', component: StorageLocationComponent},
  {path: 'user/:userId', component: UserComponent},
];
