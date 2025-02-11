import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service.component'; // Assurez-vous que le chemin est correct
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-remarque',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './remarque.component.html',
  styleUrl: './remarque.component.css'
})
export class RemarqueComponent {
  remarque: string = '';
  cin: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cin = this.route.snapshot.paramMap.get('cin') || '';
}
  updateRemarqueProjet() {
    if (!this.cin || !this.remarque.trim()) {
        alert('Tous les champs sont obligatoires.');
        return;
    }

    this.authService.updateRemarqueProjet(this.cin, this.remarque).subscribe(
        (response: any) => {
            if (response.success) {
                alert(response.message);
                this.remarque = ''; // Réinitialise la remarque après une mise à jour réussie
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
