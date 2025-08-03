import { TrackModel } from "@core/models/tracks.model";
import { Observable } from "rxjs";

export interface IHistoryRepository {
  searchTracks(term: string): Observable<TrackModel[]>
}
