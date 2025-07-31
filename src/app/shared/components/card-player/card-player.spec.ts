import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlayer } from './card-player';

describe('CardPlayer', () => {
  let component: CardPlayer;
  let fixture: ComponentFixture<CardPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
