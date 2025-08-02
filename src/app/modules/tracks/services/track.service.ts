import { TrackModel } from '@core/models/tracks.model';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ITrackFilter } from '@modules/tracks/interfaces/track-filter.interface';
import { ITrackRepository } from '@modules/tracks/interfaces/track-repository.interface';
import { TRACK_FILTER_TOKEN, TRACK_REPOSITORY_TOKEN } from '../tokens/track.tokens';
@Injectable({
  providedIn: 'root'
})
export class TrackService {

  readonly dataTracksTrendings$: Observable<TrackModel[]>;
  readonly dataTracksRandom$: Observable<TrackModel[]>;

  constructor(
    @Inject(TRACK_REPOSITORY_TOKEN) private repository: ITrackRepository,
    @Inject(TRACK_FILTER_TOKEN) private filter: ITrackFilter
  ) {
    this.dataTracksTrendings$ = this.repository.getAllTracks();
    this.dataTracksRandom$ = this.getFilteredRandomTracks();
  }

  getAllTracks$(): Observable<TrackModel[]> {
    return this.repository.getAllTracks();
  }

  getAllRandom$(): Observable<TrackModel[]> {
    return this.getFilteredRandomTracksWithDelay();
  }

  getTrackById$(id: number): Observable<TrackModel> {
    return this.repository.getTrackById(id);
  }

  private getFilteredRandomTracks(): Observable<TrackModel[]> {
    return this.repository.getRandomTracks().pipe(
      map(tracks => this.filter.filterByMultipleIds(tracks, [1, 2]))
    );
  }

   private getFilteredRandomTracksWithDelay(): Observable<TrackModel[]> {
    return this.repository.getRandomTracks().pipe(
      map(tracks => this.filter.filterByMultipleIds(tracks, [1, 2])),
      switchMap(filteredTracks => this.filter.filterWithDelay(filteredTracks, 3500))
    );
  }

  // dataTracksTrendings$: Observable<TrackModel[]> = of([]);
  // dataTracksRandom$: Observable<TrackModel[]> = of([]);

  // constructor(private http: HttpClient) {
  //   const { data }: any = (dataRow as any).default
  //   this.dataTracksTrendings$ = of(data);
  //   this.dataTracksRandom$ = new Observable<TrackModel[]>(observer => {
  //     setTimeout(() => {
  //       observer.next(data);
  //     }, 3500)
  //   })
  // }

  // private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
  //   return new Promise((resolve, reject) => {
  //     const listTmp = listTracks.filter(a => a._id !== id)
  //     resolve(listTmp)
  //   })
  // }

  // getAllTracks$(): Observable<TrackModel[]> {
  //   return this.http.get(`${this.URL}/tracks`)
  //     .pipe(
  //       map(({ data }: any) => {
  //         return data
  //       }),
  //       catchError(this.handleError)
  //     )
  // }

  // getAllRandom$(): Observable<TrackModel[]> {
  //   return this.http.get(`${this.URL}/tracks`)
  //     .pipe(
  //       mergeMap(({ data }: any) => this.skipById(data, 2)),
  //       map((dataRevertida) => { //TODO aplicar un filter comun de array
  //         return dataRevertida.filter((track: TrackModel) => track._id !== 1)
  //       }),
  //       catchError(this.handleError)
  //     )
  // }

  // private handleError = (error: HttpErrorResponse): Observable<never> => {
  //   let errorMessage = 'Error desconocido';

  //   if (error.error instanceof ErrorEvent) {
  //     // Error del lado del cliente
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Error del servidor
  //     switch (error.status) {
  //       case 400:
  //         errorMessage = 'Solicitud incorrecta';
  //         break;
  //       case 401:
  //         errorMessage = 'No autorizado';
  //         break;
  //       case 404:
  //         errorMessage = 'Recurso no encontrado';
  //         break;
  //       case 500:
  //         errorMessage = 'Error interno del servidor';
  //         break;
  //       default:
  //         errorMessage = `Error ${error.status}: ${error.message}`;
  //     }
  //   }

  //   console.error('Error en TrackService:', errorMessage);
  //   return throwError(() => new Error(errorMessage));
  // };
}
