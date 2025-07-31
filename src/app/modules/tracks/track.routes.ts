import { Routes } from '@angular/router';
import { TrackPage } from './pages/track-page/track-page';

export const TRACK_ROUTES: Routes = [
  {
    path: '',
    component: TrackPage,
    outlet: 'child',
  }
];
