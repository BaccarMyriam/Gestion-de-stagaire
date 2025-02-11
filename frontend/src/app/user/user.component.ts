import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service/auth-service.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const cin = this.authService.getLoggedInUser();
    if (cin) {
        this.authService.getUserInfo(cin).subscribe(
            (response) => {
                if (response.success) {
                    this.user = response.user;
                } else {
                    console.error(response.message);
                }
            },
            (error) => {
                console.error('Erreur :', error.message);
                // Afficher un message à l'utilisateur
                alert(error.message);
            }
        );
    } else {
        console.error('Aucun utilisateur connecté.');
    }
}
}