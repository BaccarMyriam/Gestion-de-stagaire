import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component'; // Assurez-vous que ce chemin est correct


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{
  feedbacks: any[] = []; // Liste des feedbacks récupérés
  errorMessage: string = ''; // Message d'erreur

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.authService.getFeedback().subscribe({
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
}

