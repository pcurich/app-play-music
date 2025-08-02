import { Injectable } from "@angular/core";
import { ITrackRepository } from "@modules/tracks/interfaces/track-repository.interface";
import { TrackModel } from "@core/models/tracks.model";
import { Observable, of, throwError } from "rxjs";
import * as dataRow from "../../../data/tracks.json";

@Injectable({
  providedIn: 'root'
})
export class TrackMockRepository implements ITrackRepository {
  private mockData: TrackModel[];

  constructor() {
    const { data }: any = (dataRow as any).default;
    this.mockData = data;
  }

  getAllTracks(): Observable<TrackModel[]> {
    return of(this.mockData);
  }

  getRandomTracks(): Observable<TrackModel[]> {
    return new Observable<TrackModel[]>(observer => {
      setTimeout(() => {
        observer.next(this.mockData);
        observer.complete();
      }, 3500);
    });
  }

  getTrackById(id: number): Observable<TrackModel> {
    const track = this.mockData.find(t => t._id === id);
    return track ? of(track) : throwError(() => new Error('Track not found'));
  }
}
