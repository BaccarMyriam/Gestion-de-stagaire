import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stage-form',
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './demande-projet.component.html',
  styleUrls: ['./demande-projet.component.css'],
})
export class DemandeProjetComponent {
  form: { [key: string]: any } = {
    cin: '',
    nom: '',
    email: '',
    tel: '',
    cv: null,
    lettre: null,
    convention: null,
    project: '',
  };

  selectedStage: string = '';
  projects: string[] = [];

  stageProjects: { [key: string]: string[] } = {
    init: [
      "Création d'un site vitrine pour une entreprise fictive",
      "Développement d'une application de to-do list en ligne de commande",
      "Conception et implémentation d'une base de données pour une bibliothèque",
      "Développement d'un jeu de devinette en ligne de commande",
      "Création d'un chatbot interactif en Python",
    ],
    perf: [
      "Développement d'une plateforme de réservation en ligne",
      "Conception d'une application mobile de gestion de budget",
      "Implémentation d'un système de recommandation de films",
      "Création de scripts d'automatisation pour la gestion de fichiers",
      "Développement d'un jeu 2D en utilisant Pygame",
    ],
    pfe: [
      "Développement d'un CMS personnalisé pour la gestion de contenu web",
      "Création d'un système de reconnaissance d'images basé sur l'IA",
      "Conception d'une plateforme de formation en ligne interactive",
      "Développement d'un système de gestion de stock avec prédiction de la demande",
      "Création d'une application de réalité augmentée pour la visualisation de meubles",
    ],
    db: [
      "Développement d'un Système Intelligent pour l'Extraction Automatique des Données des Constats d'Accidents en Multi-langues et Multi-typo",
      "Développement d’un Assistant Virtuel Intelligent pour l'Automatisation du Service Client d’une Compagnie d'Assurance",
      "Détection de Fraude dans les Réclamations d'Assurance Automobile",
      "Développement d'un système de gestion de stock avec prédiction de la demande",
      "Mise en place d'une Solution BI pour l'Analyse des Sinistres et des Risques en Assurance Automobile",
    ],
    soft: [
      "Développement d'une plateforme de gestion de workflows pour optimiser les processus métiers",
      "Assurance : plateforme de génération des documents",
      "OCR Langue Arabe",
      "Plateforme de Test Automatique",
      "Blockchain dans une Plateforme de Gestion de Transport",
      "Gestion des Sinistres Spéciaux sur COBOL/AS400",
    ],
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  onStageChange(): void {
    this.projects = this.stageProjects[this.selectedStage] || [];
  }

  onFileChange(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.form[fileType] = input.files[0];
    }
  }

  onSubmit(): void {
    const requiredFields = ['cin', 'nom', 'email', 'tel', 'cv', 'lettre', 'convention'];
    for (const field of requiredFields) {
      if (!this.form[field]) {
        alert(`Le champ ${field} est obligatoire.`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('cin', this.form['cin']);
    formData.append('nom', this.form['nom']);
    formData.append('email', this.form['email']);
    formData.append('tel', this.form['tel']);
    formData.append('stage', this.selectedStage);
    formData.append('project', this.form['project']);

    const fileFields = ['cv', 'lettre', 'convention'];
    for (const fileField of fileFields) {
      if (this.form[fileField] instanceof File) {
        formData.append(fileField, this.form[fileField], this.form[fileField].name);
      } else {
        alert(`Veuillez ajouter un fichier pour le champ ${fileField}.`);
        return;
      }
    }

    this.authService.submitDemandeProjet(formData).subscribe(
      (response: any) => {
        console.log('Réponse du serveur :', response);
        alert('Formulaire soumis avec succès');
        this.router.navigate(['/dashbordPrincipale']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'envoi du formulaire :', error);
        alert('Une erreur s\'est produite lors de la soumission');
      }
    );
  }
}
