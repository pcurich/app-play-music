import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { SectionGeneric } from "@shared/components/section-generic/section-generic";
import { Subscription } from 'rxjs';
import * as dataRaw from '../../../../data/tracks.json';

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

  // constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    const {data}: any = (dataRaw as any).default
    this.mockTracksList= data;

    // this.loadDataAll() //TODO 📌📌
    // this.loadDataRandom() //TODO 📌📌
  }

  async loadDataAll(): Promise<any> {
    // this.tracksTrending = await this.trackService.getAllTracks$().toPromise()

  }

  loadDataRandom(): void {
    // this.trackService.getAllRandom$()
    //   .subscribe((response: TrackModel[]) => {
    //     this.tracksRandom = response
    //   })
  }

  ngOnDestroy(): void {

  }


}
