import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component'; // Assurez-vous que le chemin est correct
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-remarque',
  templateUrl: './ajout-remarque.component.html',
  styleUrls: ['./ajout-remarque.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class AjoutRemarqueComponent {
  remarque: string = '';
  cin: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cin = this.route.snapshot.paramMap.get('cin') || '';
}


  updateRemarque() {
    if (!this.cin || !this.remarque) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    this.authService.updateRemarque(this.cin, this.remarque).subscribe(
      (response: any) => {
        if (response.success) {
          alert(response.message);
          this.remarque = '';
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
