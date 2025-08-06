import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { ImgBrokenDirective } from '@shared/index';
import { MultimediaService } from '@shared/index';

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

  multimediaService = inject(MultimediaService);


  ngOnInit(): void {
  }

  sendPlay(track: TrackModel): void {
    this.multimediaService.trackInfoSignal.set(track);
  }

}
