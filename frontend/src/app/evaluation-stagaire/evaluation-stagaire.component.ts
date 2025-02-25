import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../auth-service/auth-service.component'; // Vérifie le chemin correct
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluation-stagaire',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './evaluation-stagaire.component.html',
  styleUrls: ['./evaluation-stagaire.component.css']
})
export class EvaluationStagaireComponent implements OnInit {

  user: any = null; // Stockage des informations du stagiaire

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const cin = this.authService.getUser(); // Récupérer le CIN depuis AuthService
    if (cin) {
      this.loadStagiaireInfo(cin);
    } else {
      console.error('Aucun utilisateur connecté.');
    }
  }

  async loadStagiaireInfo(cin: string): Promise<void> {
    this.user = await this.authService.getStagiaireInfo(cin);
  }
}
