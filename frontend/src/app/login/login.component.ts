import { Component } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  log = {
    cin: '',
    password: '',
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Valider les champs
    if (!this.log.cin || !this.log.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    // Appeler le service de connexion
    this.authService.login(this.log).subscribe(
      (response: any) => {
        if (response && response.success) {
          this.successMessage = response.message;
          this.errorMessage = '';

          // Stocker le CIN dans le localStorage
          this.authService.setLoggedInUser(this.log.cin);

          // Rediriger en fonction du rôle
          if (response.redirect === 'dashbord-admin') {
            this.router.navigate(['/dashbord-admin']);
          } else if (response.redirect === 'user') {
            this.router.navigate(['/user']);
          }
        } else {
          this.errorMessage = response?.message || 'Erreur inconnue';
        }
      },
      (error: any) => {
        this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
        console.error('Erreur lors de la connexion :', error);
      }
    );
  }
}