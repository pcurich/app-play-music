import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImgBrokenDirective } from '../../directives/img-broken-directive';
import { OrderListPipe } from '@shared/pipes/order-list-pipe';
import * as dataRaw from './../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-play-list-body',
  imports: [CommonModule, ImgBrokenDirective],
  standalone: true,
  templateUrl: './play-list-body.html',
  styleUrl: './play-list-body.scss'
})
export class PlayListBody implements OnInit {
  ngOnInit(): void {
    const { data } = (dataRaw as any).default;
    this.tracks = data;
  }
  tracks: Array<TrackModel> = [];


}
