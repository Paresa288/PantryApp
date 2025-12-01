import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component ({
  selector: 'app-navbar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styles: ''
})

export class NavbarComponent {
  user = input({ id: 3, name: 'Pablo', familyId: 1 });
}