import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fback',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fback.component.html',
  styleUrls: ['./fback.component.css']
})
export class FbackComponent implements OnInit {
  feedbacks: any[] = []; // Liste des feedbacks récupérés
  errorMessage: string = ''; // Message d'erreur

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.authService.getFeedbacks().subscribe({
      next: (response: any) => {
        console.log('Réponse brute de l\'API :', response); // Debug

        if (response && Array.isArray(response.data)) {
          this.feedbacks = response.data; // Remplir la liste des feedbacks
        } else {
          this.errorMessage = 'La réponse de l\'API est invalide ou ne contient pas les données attendues.';
          console.error('Erreur dans la réponse API :', this.errorMessage);
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Une erreur s\'est produite lors de la récupération des feedbacks.';
        console.error(this.errorMessage, err);
        alert(this.errorMessage); // Simple alert for error handling
      },
      complete: () => {
        console.log('Chargement des feedbacks terminé.');
      }
    });
  }

  showResponse(email: string): void {
    // Encodage de l'email et navigation vers la page de réponse
    this.router.navigate(['/feed-reponse', encodeURIComponent(email)]);
  }
}
