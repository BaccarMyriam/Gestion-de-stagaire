import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth-service.component'; // Vérifiez le chemin d'importation

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  Cin: string = '';
  np: string = '';
  email: string = '';
  telephone: string = '';
  tarea: string = '';
  errors: string[] = []; // Tableau pour stocker les erreurs

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    this.errors = []; // Réinitialiser les erreurs
  
    // Vérification que tous les champs sont remplis correctement
    if (this.validateInputs()) {
      // Préparer les données sous forme d'objet JSON
      const payload = {
        Cin: this.Cin.trim(),
        np: this.np.trim(),
        email: this.email.trim(),
        telephone: this.telephone.trim(),
        tarea: this.tarea.trim(),
      };
  
      // Appel à la méthode `sendData` via `AuthService`
      this.authService.ssendData(payload).subscribe(
        (response) => {
          if (response.success) {
            console.log('Formulaire soumis avec succès', response);
            alert(response.message || 'Formulaire de contact soumis avec succès !');
            this.resetForm();
          } else {
            console.error('Erreur lors de la soumission du formulaire', response.message);
            alert(response.message || 'Une erreur est survenue lors de la soumission du formulaire !');
          }
        },
        (error) => {
          console.error('Erreur lors de la soumission du formulaire', error);
          // Vérification de l'existence de la réponse d'erreur
          const errorMessage = error.error?.message || 'Une erreur est survenue lors de la soumission du formulaire !';
          alert(errorMessage);
        }
      );
    } else {
      // Affichage des erreurs sous forme de message d'alerte
      alert('Veuillez remplir tous les champs requis correctement.\n' + this.errors.join('\n'));
    }
  }
  
  // Validation des champs du formulaire
  private validateInputs(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    const cinRegex = /^[0-9]{8}$/;

    if (!cinRegex.test(this.Cin)) {
      this.errors.push('Le CIN doit contenir exactement 8 chiffres.');
    }

    if (!this.np || this.np.trim().length < 3) {
      this.errors.push('Le nom complet doit contenir au moins 3 caractères.');
    }

    if (!emailRegex.test(this.email)) {
      this.errors.push('Veuillez entrer une adresse email valide.');
    }

    if (!phoneRegex.test(this.telephone)) {
      this.errors.push('Le numéro de téléphone doit être valide.');
    }

    if (!this.tarea || this.tarea.trim().length < 10) {
      this.errors.push('Le message doit contenir au moins 10 caractères.');
    }

    // Retourne `true` si aucune erreur n'a été ajoutée
    return this.errors.length === 0;
  }

  // Réinitialisation des champs du formulaire
  private resetForm(): void {
    this.Cin = '';
    this.np = '';
    this.email = '';
    this.telephone = '';
    this.tarea = '';
  }
}
