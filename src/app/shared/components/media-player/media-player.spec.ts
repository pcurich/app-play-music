import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPlayer } from './media-player';

describe('MediaPlayer', () => {
  let component: MediaPlayer;
  let fixture: ComponentFixture<MediaPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
