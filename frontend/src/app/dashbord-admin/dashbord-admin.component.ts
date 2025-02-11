import { Component } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Chemin correct vers le service d'authentification
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [CommonModule , FormsModule, RouterModule],
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css']
})
export class DashbordAdminComponent   {
  users: any[] = []; // Tableau pour stocker les utilisateurs

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Charger les utilisateurs depuis le service
  loadUsers(): void {
    this.authService.getUsers().subscribe((response: any) => {
      if (response.success) {
        this.users = response.data; // Assurez-vous que `data` est un tableau
      } else {
        console.error('Erreur dans la réponse API:', response.message);
      }
    });
  }

}
