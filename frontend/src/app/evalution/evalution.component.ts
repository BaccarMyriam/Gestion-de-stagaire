import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Service d'authentification
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-evalution',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, RouterLink],
  templateUrl: './evalution.component.html',
  styleUrls: ['./evalution.component.css'] // Correction du nom de fichier
})
export class EvalutionComponent implements OnInit {
  users: any[] = []; // Tableau des utilisateurs

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Charger les utilisateurs depuis le service
  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (response: any) => {
        if (response.success) {
          this.users = response.data; // Assurez-vous que `data` est un tableau
        } else {
          console.error('Erreur dans la réponse API:', response.message);
        }
      },
      (error: any) => {
        console.error('Erreur API :', error);
      }
    );
  }

  // Rediriger vers la page de note avec le CIN
  goToEditNote(cin: string): void {
    this.router.navigate(['/note', cin]); // Assurez-vous que cette route existe dans votre configuration
  }

  // Rediriger vers la page de résultat avec le CIN
  goToResult(cin: string): void {
    this.router.navigate(['/resultadmin', cin]); // Correction du nom de la route
  }

  // Rediriger vers la page d'attestation avec le CIN
  goToAttestation(cin: string): void {
    this.router.navigate(['/attestation', cin]); // Assurez-vous que cette route existe dans votre configuration
  }
}
