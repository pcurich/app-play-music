import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardPlayer } from '../card-player/card-player';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-section-generic',
  imports: [CommonModule, CardPlayer],
  standalone: true,
  templateUrl: './section-generic.html',
  styleUrl: './section-generic.scss'
})
export class SectionGeneric implements OnInit {
  @Input() title: string = ''
  @Input() mode: 'small' | 'big' = 'big'
  @Input() dataTracks: Array<TrackModel> = []

  constructor() { }

  ngOnInit(): void {
  }

}

