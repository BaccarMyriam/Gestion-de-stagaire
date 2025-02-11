import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Assurez-vous que ce fichier existe
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configuration du routeur
    provideHttpClient(), // Pour activer HttpClient
  ]
};