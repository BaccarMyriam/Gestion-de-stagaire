import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nproject',
  standalone: true,
  imports: [RouterModule, CommonModule], // Ajoutez CommonModule pour utiliser *ngIf et *ngFor
  templateUrl: './nproject.component.html',
  styleUrl: './nproject.component.css'
})
export class NprojectComponent implements OnInit {
  projets: any[] = []; // Tableau pour stocker les projets
  errorMessage: string = ''; // Message d'erreur

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const cin = this.authService.getLoggedInUser(); // Récupérer le CIN de l'utilisateur connecté
    if (cin) {
      this.authService.getProjetByCin(cin).subscribe(
        (response) => {
          console.log('Réponse de l\'API :', response); // Log la réponse pour le débogage
          if (response.success && Array.isArray(response.demandes)) {
            this.projets = response.demandes; // Assigner les projets si elles existent
          } else {
            this.errorMessage = 'Aucun nouveau projet trouvé ou format de réponse incorrect.';
            console.error(this.errorMessage);
          }
        },
        (error) => {
          this.errorMessage = 'Une erreur s\'est produite lors de la récupération des projets.';
          console.error('Erreur :', error.message);
          alert(this.errorMessage);
        }
      );
    } else {
      this.errorMessage = 'Utilisateur non connecté.';
     
    }
  }
}