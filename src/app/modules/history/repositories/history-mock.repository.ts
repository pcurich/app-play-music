import { Injectable } from "@angular/core";
import { ITrackRepository } from "@modules/tracks/interfaces/track-repository.interface";
import { TrackModel } from "@core/models/tracks.model";
import { Observable, of, throwError } from "rxjs";
import * as dataRow from "../../../data/tracks.json";
import { IHistoryRepository } from "../interfaces/history-repository.interface";

@Injectable({
  providedIn: 'root'
})
export class HistoryMockRepository implements IHistoryRepository {
  private mockData: TrackModel[];

  constructor() {
    const { data }: any = (dataRow as any).default;
    this.mockData = data;
  }

  searchTracks(term: string): Observable<TrackModel[]> {
    const filteredTracks = this.mockData.filter(track =>
      track.name.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredTracks);
  }

}
