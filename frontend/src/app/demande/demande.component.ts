import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Assurez-vous que le chemin d'importation est correct
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  demandes: any[] = [];  // Tableau pour stocker les demandes
  errorMessage: string = ''; // Message d'erreur si la récupération des demandes échoue

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.authService.getDemandesProjet().subscribe({
      next: (response: any) => {
        // Vérification si la réponse contient la clé "data" et si c'est un tableau
        if (response && Array.isArray(response.data)) {
          this.demandes = response.data;  // Assignation des données des demandes
        } else {
          this.errorMessage = 'Aucune donnée valide reçue.';
          console.error('Données invalides ou format inattendu:', response);
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Erreur lors du chargement des demandes : ' + err.message;
        console.error(this.errorMessage);
      }
    });
  }

  // Rediriger vers la page de modification avec l'ID de la demande (cin)
  goToEditPage(cin: string): void {
    this.router.navigate(['/modifier-etat', cin]);
  }

  // Rediriger vers la page d'ajout de remarque avec l'ID de la demande (cin)
  goToRemarkPage(cin: string): void {
    this.router.navigate(['/ajout-remarque', cin]);
  }
}
