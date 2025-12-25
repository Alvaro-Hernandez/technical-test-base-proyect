import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'simpsons',
    loadComponent: () =>
      import('./simpsons/simpsons.component').then((m) => m.SimpsonsComponent),
  },
  { path: '**', redirectTo: '' },
];
