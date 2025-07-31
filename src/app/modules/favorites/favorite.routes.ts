import { Routes } from '@angular/router';
import { FavoritePage } from './pages/favorite-page/favorite-page';

export const FAVORITE_ROUTES: Routes = [
  {
    path: '',
    component: FavoritePage,
    outlet: 'child',
  }
];
