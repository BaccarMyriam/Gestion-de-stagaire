import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component'; // Chemin correct vers le service d'authentification

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
})
export class RegisterComponent {
  user = {
    cin: '',
    name: '',
    email: '',
    password: '',
    cpassword: '',
    image: null as File | null, // Correction pour gérer les fichiers
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Gestion de la soumission du formulaire d'inscription
   */
  onSubmit() {
    if (this.user.password !== this.user.cpassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (!this.user.cin || !this.user.name || !this.user.email || !this.user.password) {
      this.errorMessage = 'Tous les champs doivent être remplis.';
      return;
    }

    if (this.user.image && !this.isValidImage(this.user.image)) {
      this.errorMessage = 'L\'image doit être de type jpg, jpeg, png ou gif.';
      return;
    }

    const formData = new FormData();
    formData.append('cin', this.user.cin);
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);

    if (this.user.image) {
      formData.append('image', this.user.image);
    }

    this.authService.register(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Inscription réussie !';
        this.router.navigate(['/dashbordPrincipale']); // Redirection après succès
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
      },
    });
  }

  /**
   * Gestion de la sélection de fichier pour l'image
   * @param event Événement de sélection de fichier
   */
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.user.image = input.files[0]; // Stocke le fichier sélectionné
    }
  }

  /**
   * Vérification du type de fichier image
   * @param file Fichier à vérifier
   * @returns Vrai si le fichier est une image valide
   */
  private isValidImage(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
  }
}
