import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importez RouterOutlet pour le routage
  template: `<router-outlet></router-outlet>` // Utilisez <router-outlet> pour afficher les routes
})
export class AppComponent {
  title ='FrontEnd';
}