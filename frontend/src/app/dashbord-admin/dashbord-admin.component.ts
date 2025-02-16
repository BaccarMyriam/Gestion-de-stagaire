import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Chemin correct vers le service d'authentification
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css'],
})
export class DashbordAdminComponent implements OnInit {
  users: any[] = []; // Tableau pour stocker les utilisateurs

  constructor(private authService: AuthService) {}

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
      (error) => {
        console.error('Erreur API :', error);
      }
    );
  }

  // Supprimer un utilisateur
  deleteUser(cin: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.authService.deleteUser(cin).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert('Utilisateur supprimé avec succès');
            this.loadUsers(); // Recharger la liste des utilisateurs
          } else {
            alert('Erreur lors de la suppression : ' + response.message);
          }
        },
        (error) => {
          console.error('Erreur API :', error);
        }
      );
    }
  }
}