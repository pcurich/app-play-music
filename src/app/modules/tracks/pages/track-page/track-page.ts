import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { SectionGeneric } from "@shared/components/section-generic/section-generic";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-track-page',
  imports: [SectionGeneric],
  standalone: true,
  templateUrl: './track-page.html',
  styleUrl: './track-page.scss'
})
export class TrackPage implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []
  listObservers$: Array<Subscription> = []
  mockTracksList: Array<TrackModel> = []

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {

    const observer1$: Subscription = this.trackService.dataTracksTrendings$.subscribe((tracks: TrackModel[]) => {
      this.mockTracksList = tracks;
      this.tracksTrending = tracks;
      this.tracksRandom = tracks;
    })

    const observer2$: Subscription = this.trackService.dataTracksRandom$.subscribe((tracks: TrackModel[]) => {
      const startId = this.tracksRandom.length + 1;
      const updatedTracks = tracks.map((track, idx) => ({
        ...track,
        _id: startId + idx
      }));
      this.tracksRandom = [...this.tracksRandom, ...updatedTracks];
      console.log('PCURICH', this.tracksRandom);
    })
    this.listObservers$ = [observer1$, observer2$];

    // this.loadDataAll() //TODO 📌📌
    // this.loadDataRandom() //TODO 📌📌
  }

  async loadDataAll(): Promise<any> {
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise()

  }

  loadDataRandom(): void {
    this.trackService.getAllRandom$()
      .subscribe((response: TrackModel[]) => {
        this.tracksRandom = response
      })
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log('🔴🔴🔴🔴🔴🔴🔴 track page!');
  }


}
