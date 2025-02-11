import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Chemin ajusté pour pointer correctement vers le service
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projets: any[] = []; // Initialisation de la liste des projets

  constructor(private authService: AuthService, private router: Router) {} // Ajout du Router dans le constructeur

  ngOnInit(): void {
    // Récupération des projets via le service d'authentification
    this.authService.getProjects().subscribe((data: any) => {
      this.projets = data; // Mise à jour de la liste des projets
    });
  }

  // Méthodes pour gérer l'état et les remarques
  onChangeEtat(cin: string): void {
    // Redirection vers la page de modification de l'état
    this.router.navigate(['/etatprojet', cin]);
  }

  onAddRemarque(cin: string): void {
    // Redirection vers la page d'ajout de remarque
    this.router.navigate(['/remarque', cin]);
  }
}
