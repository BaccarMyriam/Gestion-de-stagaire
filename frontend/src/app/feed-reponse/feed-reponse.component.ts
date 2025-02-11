import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed-reponse',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './feed-reponse.component.html',
  styleUrls: ['./feed-reponse.component.css'],
})
export class FeedReponseComponent implements OnInit {
  reponse: string = '';
  email: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.email = decodeURIComponent(this.route.snapshot.paramMap.get('email') || '');

  }

  Reponsefeed() {
    if (!this.email.trim() || !this.reponse.trim()) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    this.authService.Reponsefeed(this.email, this.reponse).subscribe(
      (response: any) => {
        if (response.success) {
          alert(response.message);
          this.reponse = ''; // Réinitialisation du champ réponse après succès
        } else {
          alert('Erreur : ' + response.message);
        }
      },
      (error) => {
        console.error('Erreur lors de la requête', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }
}
