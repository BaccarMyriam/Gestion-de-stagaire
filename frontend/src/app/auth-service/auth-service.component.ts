import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL de l'API backend
  private apiBaseUrl = 'http://localhost/Backend-Addinn/api';
  private registerUrl = `${this.apiBaseUrl}/register.php`;
  private loginUrl = `${this.apiBaseUrl}/login.php`;
  private demandeProjetUrl = `${this.apiBaseUrl}/demandeProjet.php`;
  private addProjetUrl = `${this.apiBaseUrl}/projet.php`;
  private contactUrl = `${this.apiBaseUrl}/contact.php`;
  private userInfoUrl = `${this.apiBaseUrl}/get_user_info.php`; // URL de l'API pour récupérer les infos utilisateur
  private apiEtatUrl = 'http://localhost/Backend-Addinn/api/admin/modifier_etat.php';

  // URLs pour l'admin
  private apiAdminUrl = 'http://localhost/Backend-Addinn/api/admin';
  private getUsersUrl = `${this.apiAdminUrl}/getUsers.php`;
  private getDemandeUrl = `${this.apiAdminUrl}/getDemande.php`;
  private getProjectsUrl = `${this.apiAdminUrl}/getProjects.php`;
  private getContactsUrl = `${this.apiAdminUrl}/getContacts.php`;
  private getFeedbackUrl = `${this.apiAdminUrl}/updateFeedback.php`;

  constructor(private http: HttpClient) {}

  // Méthode pour l'inscription
  register(formData: FormData): Observable<any> {
    return this.http.post(this.registerUrl, formData).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'inscription :', error.message || error);
        return throwError('Une erreur s\'est produite lors de l\'inscription.');
      })
    );
  }

  // Méthode pour se connecter
  login(credentials: { cin: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials).pipe(
      catchError((error) => {
        console.error('Erreur lors de la connexion :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la connexion.');
      })
    );
  }

  // Méthode pour stocker le CIN dans le localStorage
  setLoggedInUser(cin: string): void {
    localStorage.setItem('loggedInUser', cin);
  }

  // Méthode pour récupérer le CIN depuis le localStorage
  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  // Méthode pour déconnecter l'utilisateur (supprimer le CIN du localStorage)
  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

  // Méthode pour soumettre une demande de projet
  submitDemandeProjet(formData: FormData): Observable<any> {
    return this.http.post(this.demandeProjetUrl, formData).pipe(
      catchError((error) => {
        console.error('Erreur lors de la soumission de la demande de projet :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la soumission.');
      })
    );
  }

  // Méthode pour récupérer les projets dynamiquement en fonction du stage
  getProjectsByStage(stage: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.getProjectsUrl}?stage=${encodeURIComponent(stage)}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des projets :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la récupération des projets.');
      })
    );
  }

  // Méthode pour ajouter un projet
  addProjet(projectData: any): Observable<any> {
    return this.http.post(this.addProjetUrl, projectData).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'ajout du projet :', error.message || error);
        return throwError('Une erreur s\'est produite lors de l\'ajout du projet.');
      })
    );
  }

   // Méthode pour envoyer les données au backend
   ssendData(payload: any): Observable<any> {
    return this.http.post(this.contactUrl, payload).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'envoi des données :', error.message || error);
        return of({
          success: false,
          message: 'Une erreur est survenue lors de la soumission des données.',
        });
      })
    );
  }

  // Méthode pour envoyer un feedback
  feedback(feedbackData: any): Observable<any> {
    return this.http.post('http://localhost/Backend-Addinn/api/feedback.php', feedbackData, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'envoi du feedback :', error.message || error);
        return throwError('Une erreur s\'est produite lors de l\'envoi du feedback.');
      })
    );
  }

  // Méthode pour récupérer les informations de l'utilisateur
  getUserInfo(cin: string): Observable<any> {
    console.log('URL de la requête :', `${this.userInfoUrl}?cin=${cin}`); // Debugging
    return this.http.get(`${this.userInfoUrl}?cin=${cin}`).pipe(
        catchError((error) => {
            console.error('Erreur lors de la requête :', {
                message: error.message,
                status: error.status,
                url: error.url,
                error: error.error
            });
            // Retourner un objet d'erreur personnalisé
            return throwError({
                success: false,
                message: 'Une erreur s\'est produite lors de la récupération des informations.',
                details: error
            });
        })
    );
}

  // Méthode pour récupérer la liste des utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.getUsersUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la récupération des utilisateurs.');
      })
    );
  }

  // Méthode pour récupérer les demandes de projet
  getDemandesProjet(): Observable<any[]> {
    return this.http.get<any[]>(this.getDemandeUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des demandes :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la récupération des demandes.');
      })
    );
  }

  // Méthode pour récupérer tous les projets
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.getProjectsUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des projets :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la récupération des projets.');
      })
    );
  }

  // Méthode pour récupérer les contacts
  getContacts(): Observable<any> {
    return this.http.get(this.getContactsUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des contacts :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la récupération des contacts.');
      })
    );
  }

  // Méthode pour récupérer les feedbacks
  getFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(this.getFeedbackUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des feedbacks :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la récupération des feedbacks.');
      })
    );
  }
  
// Dans AuthService
getDemandesByCin(cin: string): Observable<any> {
  return this.http.get(`${this.apiAdminUrl}/getDemandesByCin.php?cin=${cin}`).pipe(
    catchError((error) => {
      console.error('Erreur lors de la récupération des demandes :', error);
      return throwError('Une erreur s\'est produite lors de la récupération des demandes.');
    })
  );
}
// Dans AuthService
getProjetByCin(cin: string): Observable<any> {
  return this.http.get(`${this.apiAdminUrl}/getProjetByCin.php?cin=${cin}`).pipe(
    catchError((error) => {
      console.error('Erreur lors de la récupération des nouveaux projets :', error);
      return throwError('Une erreur s\'est produite lors de la récupération des nouveaux projets.');
    })
  );
}
// Dans AuthService
getContactByCin(cin: string): Observable<any> {
  return this.http.get(`${this.apiAdminUrl}/getContactByCin.php?cin=${cin}`).pipe(
    catchError((error) => {
      console.error('Erreur lors de la récupération des contacts :', error);
      return throwError('Une erreur s\'est produite lors de la récupération des contacts.');
    })
  );
}
  // Méthode pour récupérer la liste des feedbacks
  getFeedback(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiAdminUrl}/getFeedbackUser.php`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des feedbacks :', error.message || error);
        return throwError('Une erreur s\'est produite lors de la récupération des .');
      })
    );
  }
  // Methode pour modifier reponse de contact
updateReponse(cin: string, reponse: string): Observable<any> {
  const data = { cin, reponse };
  return this.http.post(`${this.apiAdminUrl}/updateReponse.php`, data).pipe(
    catchError((error) => {
      console.error('Erreur lors de la mise à jour de la réponse :', error);
      return throwError('Une erreur s\'est produite lors de la mise à jour de la réponse.');
    })
  );
}
  updateRemarque(cin: string, remarque: string): Observable<any> {
    const data = { cin, remarque };
    return this.http.post(`${this.apiAdminUrl}/updateRemarque.php`, data).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour de la remarque :', error);
        return throwError('Une erreur s\'est produite lors de la mise à jour de la remarque.');
      })
    );
  }
  
  updateRemarqueProjet(cin: string, remarque: string): Observable<any> {
    const data = { cin, remarque };
    return this.http.post('http://localhost/Backend-Addinn/api/admin/updateRemarqueProjet.php', data).pipe(
        catchError((error) => {
            console.error('Erreur lors de la mise à jour de la remarque pour le projet :', error);
            return throwError('Une erreur s\'est produite lors de la mise à jour de la remarque pour le projet.');
        })
    );
  }

  updateEtat(cin: string, etat: string): Observable<any> {
    return this.http.put('http://localhost/Backend-Addinn/api/admin/modifier_etat.php', { cin, etat });
  }
  
  updateEtatProjet(cin: string, etat: string): Observable<any> {
    return this.http.put('http://localhost/Backend-Addinn/api/admin/etatProjet.php', { cin, etat });
  }
    // Methode pour modifier reponse de contact
    Reponsefeed(email: string, reponse: string): Observable<any> {
      const data = { email, reponse };
      return this.http.post(`${this.apiAdminUrl}/updateRepFeed.php`, data).pipe(
        catchError((error) => {
          console.error('Erreur lors de la mise à jour de la réponse :', error);
          return throwError(() => new Error("Une erreur s'est produite lors de la mise à jour de la réponse."));
        })
      );
    }
}