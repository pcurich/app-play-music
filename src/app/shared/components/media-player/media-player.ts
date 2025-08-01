import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-player.html',
  styleUrl: './media-player.scss'
})
export class MediaPlayer implements OnDestroy    {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')

  private readonly multimediaService: MultimediaService = inject(MultimediaService);

  mockCover = signal<TrackModel>({
    _id: 0,
    name: 'Track Name',
    album: 'Album Name',
    cover: 'https://via.placeholder.com/150',
    url: 'https://example.com/track.mp3'
  });

  listObservers$: Array<Subscription> = []
  state = toSignal(this.multimediaService.callback, { initialValue: 'paused' });

  ngOnDestroy(): void {
    console.log('🔴🔴🔴🔴🔴🔴🔴 BOOM!');
  }


  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    // this.multimediaService.seekAudio(percentageFromX)
  }


}
