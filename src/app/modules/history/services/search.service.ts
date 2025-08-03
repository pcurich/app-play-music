import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { IHistoryRepository } from '../interfaces/history-repository.interface';
import { HISTORY_REPOSITORY_TOKEN } from '../tokens/history.tokens';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
 private readonly URL = environment.api

  constructor(@Inject(HISTORY_REPOSITORY_TOKEN) private repository: IHistoryRepository) { }

  searchTracks$(term: string): Observable<TrackModel[]> {
    return this.repository.searchTracks(term)
  }
}
