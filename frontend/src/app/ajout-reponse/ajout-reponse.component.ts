import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component'; // Assurez-vous que le chemin vers le service est correct

@Component({
  selector: 'app-ajout-reponse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout-reponse.component.html',
  styleUrls: ['./ajout-reponse.component.css']
})
export class AjoutReponseComponent implements OnInit {
  reponse: string = '';
  cin: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cin = this.route.snapshot.paramMap.get('Cin') || '';
  }

  updateReponse() {
    if (!this.cin || !this.reponse) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    this.authService.updateReponse(this.cin, this.reponse).subscribe(
      (response: any) => {
        if (response.success) {
          alert(response.message);
          this.reponse = '';
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