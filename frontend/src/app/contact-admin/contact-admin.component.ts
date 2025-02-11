import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Assurez-vous que le chemin vers le service est correct
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css'],
})
export class ContactAdminComponent implements OnInit {
  contacts: any[] = []; // Liste des contacts récupérés
  errorMessage: string = ''; // Message d'erreur pour afficher les problèmes éventuels

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts(); // Charger les contacts lors de l'initialisation
  }

  // Charger les contacts depuis le service
  loadContacts(): void {
    this.authService.getContacts().subscribe({
      next: (response: any) => {
        console.log('Réponse brute de l\'API :', response); // Debug pour confirmer la réponse
        if (response && response.data) {
          this.contacts = response.data; // Remplir la liste des contacts si le champ `data` existe
        } else {
          this.errorMessage = 'La réponse de l\'API est invalide ou ne contient pas les données attendues.';
          console.error('Erreur dans la réponse API :', this.errorMessage);
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Une erreur s\'est produite lors de la récupération des contacts.';
        console.error(this.errorMessage, err);
      },
    });
  
  }
  goToReponse(Cin: string): void {
    this.router.navigate(['/ajout-reponse', Cin]);
  }
  
}
