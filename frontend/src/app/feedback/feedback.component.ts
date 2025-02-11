import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component'; // Assurez-vous que ce chemin est correct

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  feedbackForm: any = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode pour valider une adresse e-mail
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  sendFeedback(): void {
    if (!this.feedbackForm.name.trim() || !this.feedbackForm.email.trim() || !this.feedbackForm.message.trim()) {
      alert('Tous les champs sont obligatoires.');
      return;
    }
  
    if (!this.isValidEmail(this.feedbackForm.email)) {
      alert('Veuillez entrer une adresse e-mail valide.');
      return;
    }
  
    const feedbackData = {
      name: this.feedbackForm.name.trim(),
      email: this.feedbackForm.email.trim(),
      message: this.feedbackForm.message.trim(),
    };
  
    this.authService.feedback(feedbackData).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Votre feedback a été envoyé avec succès.');
          this.feedbackForm = { name: '', email: '', message: '' }; // Réinitialiser le formulaire
        } else {
          alert(response.message || 'Une erreur est survenue.');
        }
      },
      (error: any) => {
        console.error('Erreur lors de l\'envoi du feedback :', error.message);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    );
  }
  
}
