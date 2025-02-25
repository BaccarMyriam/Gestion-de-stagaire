import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Vérifie le bon chemin
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router'; // Pour récupérer les paramètres d'URL

@Component({
  selector: 'app-resltadmin',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './resltadmin.component.html',
  styleUrls: ['./resltadmin.component.css'] // Correction ici
})
export class ResltadminComponent implements OnInit {
  cin: string = ''; // Le CIN est récupéré depuis l'URL
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute // Pour accéder aux paramètres de l'URL
  ) {}

  ngOnInit(): void {
    // Récupération du CIN depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.cin = params.get('cin') || ''; // Récupère le CIN de l'URL
    });
  }

  submitMessage(): void {
    if (!this.cin || !this.message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const userUpdate = {
      cin: this.cin,  // Le CIN est inclus dans les données envoyées
      resultat: this.message
    };

    this.authService.updateUserMessage(userUpdate).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Résultat mis à jour avec succès !');
        } else {
          alert('Erreur lors de la mise à jour du résultat.');
        }
      },
      (error) => {
        console.error('Erreur API :', error);
        alert('Erreur de communication avec le serveur.');
      }
    );
  }
}
