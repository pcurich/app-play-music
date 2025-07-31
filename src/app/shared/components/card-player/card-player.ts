import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { ImgBrokenDirective } from '@shared/directives/img-broken-directive';

@Component({
  selector: 'app-card-player',
  imports: [CommonModule, ImgBrokenDirective],
  standalone: true,
  templateUrl: './card-player.html',
  styleUrl: './card-player.scss'
})
export class CardPlayer implements OnInit {
  @Input() mode: 'small' | 'big' = 'small'
  @Input() track: TrackModel = { _id: 0, name: '', album: '', url: '', cover: '' };

  // constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
  }

  sendPlay(track: TrackModel): void {
    // this.multimediaService.trackInfo$.next(track)
  }

}
