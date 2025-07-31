import { Routes } from '@angular/router';
import { HistoryPage } from './pages/history-page/history-page';

export const HISTORY_ROUTES: Routes = [
  {
    path: '',
    component: HistoryPage,
    outlet: 'child',
  }
];
