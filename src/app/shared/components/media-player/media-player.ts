import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/index';
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

  public readonly multimediaService: MultimediaService = inject(MultimediaService);

  state = toSignal(this.multimediaService.callback, { initialValue: 'paused' });

  constructor() {
    effect(() => {
      this.state  = this.multimediaService.playerStatusSignal;
    });
  }

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
    this.multimediaService.seekAudio(percentageFromX)
  }


}
