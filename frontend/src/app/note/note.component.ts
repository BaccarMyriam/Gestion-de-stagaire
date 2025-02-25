import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Vérifie le bon chemin
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router'; // Pour récupérer les paramètres d'URL


@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  cin: string = ''; // Le CIN est récupéré depuis l'URL
  note: number | null = null; // Le champ note de type double
  message: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute // Pour accéder aux paramètres de l'URL
  ) {}

  ngOnInit(): void {
    // Récupération du CIN depuis l'URL
    this.route.paramMap.subscribe((params) => {
      this.cin = params.get('cin') || ''; // Récupère le CIN de l'URL
    });
  }

  submitMessage(): void {
    if (!this.cin || this.note === null) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const userUpdate = {
      cin: this.cin,
      notes: this.note, // Le champ de la note est envoyé ici
    };

    this.authService.updateUserNote(userUpdate).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Note mise à jour avec succès !');
        } else {
          alert('Erreur lors de la mise à jour de la note.');
        }
      },
      (error) => {
        console.error('Erreur API :', error);
        alert('Erreur de communication avec le serveur.');
      }
    );
  }
}
