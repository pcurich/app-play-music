import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { SectionGeneric } from "@shared/index";
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-track-page',
  imports: [SectionGeneric],
  standalone: true,
  templateUrl: './track-page.html',
  styleUrl: './track-page.scss'
})
export class TrackPage {
  @Input() trackId: number = 0;
  private trackService = inject(TrackService);

  tracksTrending = toSignal(this.trackService.getAllTracks$().pipe(
    catchError(err => {
      console.error('Error loading tracks:', err);
      return of([]);
    })
  ), { initialValue: [] });
  tracksRandom = signal<TrackModel[]>([]);

  constructor() {

    this.trackService.dataTracksTrendings$.subscribe(tracks => {
      this.tracksRandom.set(tracks);
    });

    this.trackService.getAllRandom$().subscribe(tracks => {
      const currentTracks = this.tracksRandom();
      const startId = currentTracks.length + 2;

      const updatedTracks = tracks.map((track, idx) => ({
        ...track,
        _id: startId + idx
      }));

      this.tracksRandom.update(current => [...current, ...updatedTracks]);
    });
  }
}
