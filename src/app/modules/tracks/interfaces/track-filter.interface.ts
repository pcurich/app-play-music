import { TrackModel } from "@core/models/tracks.model";
import { Observable } from "rxjs";

export interface ITrackFilter {
  filterById(tracks: TrackModel[], id: number): TrackModel[];
  filterByMultipleIds(tracks: TrackModel[], ids: number[]): TrackModel[];
  filterWithDelay(tracks: TrackModel[], delay: number): Observable<TrackModel[]>;
  filterByIdWithDelay(tracks: TrackModel[], id: number, delay?: number): Observable<TrackModel[]>;
}
