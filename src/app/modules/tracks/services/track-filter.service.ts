import { Injectable } from "@angular/core";
import { TrackModel } from "@core/models/tracks.model";
import { Observable } from "rxjs";
import { ITrackFilter } from "../interfaces/track-filter.interface";

@Injectable({
  providedIn: 'root'
})
export class TrackFilterService implements ITrackFilter {
  filterById(tracks: TrackModel[], id: number): TrackModel[] {
    return tracks.filter(track => track._id !== id);
  }

  filterByMultipleIds(tracks: TrackModel[], ids: number[]): TrackModel[] {
    return tracks.filter(track => !ids.includes(track._id));
  }

    filterWithDelay(tracks: TrackModel[], delay: number = 3500): Observable<TrackModel[]> {
    return new Observable<TrackModel[]>(observer => {
      setTimeout(() => {
        observer.next(tracks);
        observer.complete();
      }, delay);
    });
  }

  filterByIdWithDelay(tracks: TrackModel[], id: number, delay: number = 3500): Observable<TrackModel[]> {
  return new Observable<TrackModel[]>(observer => {
    setTimeout(() => {
      const filteredTracks = this.filterById(tracks, id);
      observer.next(filteredTracks);
      observer.complete();
    }, delay);
  });
}
}
