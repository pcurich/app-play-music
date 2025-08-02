import { TrackModel } from "@core/models/tracks.model";
import { Observable } from "rxjs";

export interface ITrackRepository {
  getAllTracks(): Observable<TrackModel[]>;
  getRandomTracks(): Observable<TrackModel[]>;
  getTrackById(id: number): Observable<TrackModel>;
}
