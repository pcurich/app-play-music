import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ImgBrokenDirective } from '../../directives/img-broken-directive';
import { OrderListPipe } from '@shared/pipes/order-list-pipe';
import * as dataRaw from './../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-play-list-body',
  imports: [CommonModule, ImgBrokenDirective, OrderListPipe],
  standalone: true,
  templateUrl: './play-list-body.html',
  styleUrl: './play-list-body.scss'
})
export class PlayListBody implements OnInit {
  optionSort: { property: string | null, order: string } = { property: null, order: 'asc' }
  @Input() tracks: Array<TrackModel> = [];

  ngOnInit(): void {
    const { data } = (dataRaw as any).default;
    this.tracks = data;
  }

  changeSort(property: string): void {
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort);

  }
}
