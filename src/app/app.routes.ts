import { Routes } from '@angular/router';
import { HomePage } from '@modules/home/pages/home-page/home-page';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    component: HomePage,
    loadChildren: () =>
      import('./modules/home/home.routes').then(m => m.HOME_ROUTES)
  }
];
