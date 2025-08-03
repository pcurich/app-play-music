import { environment } from '@env/environment';
import { HISTORY_REPOSITORY_TOKEN } from '../tokens/history.tokens';
import { HistoryHttpRepository } from '../repositories/history-http.repository';
import { HistoryMockRepository } from '../repositories/history-mock.repository';

export const HISTORY_PROVIDERS = [
  {
    provide: HISTORY_REPOSITORY_TOKEN,
    useClass: environment.production ? HistoryHttpRepository : HistoryMockRepository
  }
];
