import { Routes } from '@angular/router';
import { authGuard } from '@modules/auth/guards/auth.guard';
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
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/home/home.routes').then(m => m.HOME_ROUTES)
  }
];
