import { Routes } from '@angular/router';

import { LoginPage } from './pages/login-page/login-page';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path:'**',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];
