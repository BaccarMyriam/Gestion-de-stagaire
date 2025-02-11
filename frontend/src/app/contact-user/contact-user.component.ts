import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-user',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './contact-user.component.html',
  styleUrl: './contact-user.component.css'
})
export class ContactUserComponent implements OnInit{
  contact: any[] = []; // Tableau pour stocker les projets
  errorMessage: string = ''; // Message d'erreur

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const cin = this.authService.getLoggedInUser(); // Récupérer le CIN de l'utilisateur connecté
    if (cin) {
      this.authService.getContactByCin(cin).subscribe(
        (response) => {
          console.log('Réponse de l\'API :', response); // Log la réponse pour le débogage
          if (response.success && Array.isArray(response.contact)) {
            this.contact = response.contact; // Assigner les contacts si elles existent
          } else {
            this.errorMessage = 'Aucun contact trouvé ou format de réponse incorrect.';
            console.error(this.errorMessage);
          }
        },
        (error) => {
          this.errorMessage = 'Une erreur s\'est produite lors de la récupération des contacts.';
          console.error('Erreur :', error.message);
          alert(this.errorMessage);
        }
      );
    } else {
      this.errorMessage = 'Utilisateur non connecté.';
    }
  }
}
