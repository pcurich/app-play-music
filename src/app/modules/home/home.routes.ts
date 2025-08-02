import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

export const HOME_ROUTES: Routes = [
  {
    path: 'tracks',
    loadChildren: () =>
      import('@modules/tracks/track.routes').then(m => m.TRACK_ROUTES)
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('@modules/favorites/favorite.routes').then(m => m.FAVORITE_ROUTES)
  },
  {
    path: 'history',
    loadChildren: () =>
      import('@modules/history/history.routes').then(m => m.HISTORY_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/tracks',
    pathMatch: 'full'
  },
];
