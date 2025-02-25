import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; // Vérifie le bon chemin
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute,RouterLink } from '@angular/router'; // Pour récupérer les paramètres d'URL

@Component({
  selector: 'app-attestation',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.css'],
})
export class AttestationComponent implements OnInit {
  cin: string = ''; // Le CIN est récupéré depuis l'URL
  file: File | null = null; // Le fichier à télécharger

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

  onFileChange(event: any): void {
    this.file = event.target.files[0]; // Récupère le fichier sélectionné
  }

  submitAttestation(): void {
    if (!this.cin || !this.file) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const formData = new FormData();
    formData.append('cin', this.cin);
    formData.append('pdfFile', this.file); // Ajout du fichier PDF

    this.authService.updateUserAttestation(formData).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Attestation de stage mise à jour avec succès !');
        } else {
          alert('Erreur lors de la mise à jour de l\'attestation.');
        }
      },
      (error) => {
        console.error('Erreur API :', error);
        alert('Erreur de communication avec le serveur.');
      }
    );
  }
}
