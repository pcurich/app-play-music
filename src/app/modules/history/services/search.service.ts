import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
 private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  searchTracks$(term: string): Observable<TrackModel[]> {
    return this.http.get<{data: TrackModel[]}>(`${this.URL}/tracks?src=${term}`)
      .pipe(
        map(response => {
          console.log('Search results:', response.data);
          return response.data;
        }),
      )
  }
}
