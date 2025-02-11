import { Component } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Chemin correct vers AuthService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.css']
})
export class AjoutProjetComponent {
  project = {
    cin: '',
    name: '',
    email: '',
    nprojet: '',
    description: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Vérifiez si tous les champs sont remplis
    if (!this.project.cin || !this.project.name || !this.project.email || !this.project.nprojet || !this.project.description) {
      console.error('Tous les champs sont requis');
      alert('Veuillez remplir tous les champs avant de soumettre le formulaire.');
      return;
    }

    const projectData = { ...this.project }; // Clone des données pour éviter la mutation directe

    // Envoyer les données via AuthService
    this.authService.addProjet(projectData).subscribe(
      response => {
        console.log('Projet ajouté avec succès :', response);
        alert('Projet ajouté avec succès.');
        this.router.navigate(['/dashbordPrincipale']);// Redirection en cas de succès
      },
      error => {
        console.error('Erreur lors de l\'ajout du projet :', error);
        alert('Une erreur s\'est produite lors de l\'ajout du projet. Veuillez réessayer.');
      }
    );
    
  }
}
