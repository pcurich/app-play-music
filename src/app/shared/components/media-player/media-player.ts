import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-player.html',
  styleUrl: './media-player.scss'
})
export class MediaPlayer implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    _id: 0,
    name: 'Track Name',
    album: 'Album Name',
    cover: 'https://via.placeholder.com/150',
    url: 'https://example.com/track.mp3'
  }
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  // constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {

    // const observer1$ = this.multimediaService.playerStatus$
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(status => this.state = status)
    // this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
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
