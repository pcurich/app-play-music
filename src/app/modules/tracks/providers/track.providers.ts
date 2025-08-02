import { environment } from '@env/environment';
import { TRACK_FILTER_TOKEN, TRACK_REPOSITORY_TOKEN } from "../tokens/track.tokens";
import { TrackFilterService } from "../services/track-filter.service";
import { TrackHttpRepository } from "../repositories/track-http.repository";
import { TrackMockRepository } from "../repositories/track-mock.repository";

export const TRACK_PROVIDERS = [
  {
    provide: TRACK_REPOSITORY_TOKEN,
    useClass: environment.production ? TrackHttpRepository : TrackMockRepository
  },
  {
    provide: TRACK_FILTER_TOKEN,
    useClass: TrackFilterService
  }
];
