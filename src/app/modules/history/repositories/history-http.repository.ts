import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { TrackModel } from "@core/models/tracks.model";
import { Observable, map, catchError } from "rxjs";
import { environment } from '@env/environment';
import { IErrorHandler } from "@shared/index";
import { ERROR_HANDLER_TOKEN } from "@shared/index";
import { IHistoryRepository } from "../interfaces/history-repository.interface";

@Injectable({
  providedIn: 'root'
})
export class HistoryHttpRepository implements IHistoryRepository {
  private readonly URL = environment.api;

  constructor(
    private http: HttpClient,
    @Inject(ERROR_HANDLER_TOKEN) private errorHandler: IErrorHandler
  ) {}

  searchTracks(term: string): Observable<TrackModel[]> {
    return this.http.get<{data: TrackModel[]}>(`${this.URL}/tracks?src=${term}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }

}
