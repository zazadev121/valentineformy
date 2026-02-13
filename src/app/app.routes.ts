import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/security-gate-page/security-gate-page.component').then(m => m.SecurityGatePageComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'love-story',
    loadComponent: () => import('./pages/love-story-page/love-story-page.component').then(m => m.LoveStoryPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'reasons',
    loadComponent: () => import('./pages/reasons-page/reasons-page.component').then(m => m.ReasonsPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery-page/gallery-page.component').then(m => m.GalleryPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz-page/quiz-page.component').then(m => m.QuizPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'final',
    loadComponent: () => import('./pages/final-page/final-page.component').then(m => m.FinalPageComponent),
    canActivate: [authGuard]
  },
  // Special interactive pages
  {
    path: 'secret',
    loadComponent: () => import('./pages/secret-page/secret-page.component').then(m => m.SecretPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'date-night',
    loadComponent: () => import('./pages/date-night-page/date-night-page.component').then(m => m.DateNightPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'comfort',
    loadComponent: () => import('./pages/comfort-page/comfort-page.component').then(m => m.ComfortPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'world-without-you',
    loadComponent: () => import('./pages/world-without-you-page/world-without-you-page.component').then(m => m.WorldWithoutYouPageComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
