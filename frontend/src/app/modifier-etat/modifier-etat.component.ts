import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-service/auth-service.component'; // Assurez-vous que le chemin d'importation est correct
import{FormsModule}from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-etat',
  standalone:true,
  imports:[FormsModule, CommonModule],
  templateUrl: './modifier-etat.component.html',
  styleUrl:'./modifier-etat.component.css',
})
export class ModifierEtatComponent implements OnInit {
  cin: string = '';
  etat: string = '';
  etats = [
    { value: 'Accepter', label: 'Accepter' },
    { value: 'Refuser', label: 'Refuser' },
    { value: 'En attente', label: 'En attente' }
  ];

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    // Récupérer le CIN depuis l'URL
    this.cin = this.route.snapshot.paramMap.get('cin') || '';
    if (!this.cin) {
      console.error('CIN non fourni dans l’URL');
    }
  }

  onSubmit() {
    if (!this.etat) {
      console.error('État manquant');
      return;
    }

    console.log('Valeur envoyée pour CIN:', this.cin);
    console.log('Valeur envoyée pour état:', this.etat);

    this.authService.updateEtat(this.cin, this.etat).subscribe({
      next: (response: any) => {
        console.log('Réponse serveur:', response);
      },
      error: (error: any) => {
        console.error('Erreur:', error);
      }
    });
  }
}
