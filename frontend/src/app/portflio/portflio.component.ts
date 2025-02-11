import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portflio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portflio.component.html',
  styleUrls: ['./portflio.component.css']
})
export class PortflioComponent implements OnInit {
  demandes: any[] = []; // Tableau pour stocker les demandes
  errorMessage: string = ''; // Message d'erreur

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const cin = this.authService.getLoggedInUser(); // Récupérer le CIN de l'utilisateur connecté
    if (cin) {
      this.authService.getDemandesByCin(cin).subscribe(
        (response) => {
          console.log('Réponse de l\'API :', response); // Log la réponse pour le débogage
          if (response.success && Array.isArray(response.demandes)) {
            this.demandes = response.demandes; // Assigner les demandes si elles existent
          } else {
            this.errorMessage = 'Aucune demande trouvée ou format de réponse incorrect.';
            console.error(this.errorMessage);
          }
        },
        (error) => {
          this.errorMessage = 'Une erreur s\'est produite lors de la récupération des demandes.';
          console.error('Erreur :', error.message);
          alert(this.errorMessage);
        }
      );
    } else {
      this.errorMessage = 'Utilisateur non connecté.';
      console.error(this.errorMessage);
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
    }
  }
}