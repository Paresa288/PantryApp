import { Component } from '@angular/core';
import { NavbarComponent } from "./shared/layout/navbar/navbar.component";
import { PageLayoutComponent } from "./shared/layout/page-layout/page-layout.component";
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, PageLayoutComponent],
  templateUrl: './app.component.html',
  styles: ''
})
export class AppComponent {
  title = 'PantryApp';
  user:User = { id: 1, name: 'Pablo', familyId: 1 };
}
