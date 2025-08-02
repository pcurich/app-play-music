import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ITrackRepository } from "@modules/tracks/interfaces/track-repository.interface";
import { TrackModel } from "@core/models/tracks.model";
import { Observable, map, catchError } from "rxjs";
import { environment } from '@env/environment';
import { IErrorHandler } from "@shared/index";
import { ERROR_HANDLER_TOKEN } from "@shared/index";




@Injectable({
  providedIn: 'root'
})
export class TrackHttpRepository implements ITrackRepository {
  private readonly URL = environment.api;

  constructor(
    private http: HttpClient,
    @Inject(ERROR_HANDLER_TOKEN) private errorHandler: IErrorHandler
  ) {}

  getAllTracks(): Observable<TrackModel[]> {
    return this.http.get<{data: TrackModel[]}>(`${this.URL}/tracks`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }

  getRandomTracks(): Observable<TrackModel[]> {
    return this.http.get<{data: TrackModel[]}>(`${this.URL}/tracks`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }

  getTrackById(id: number): Observable<TrackModel> {
    return this.http.get<{data: TrackModel}>(`${this.URL}/tracks/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }
}
