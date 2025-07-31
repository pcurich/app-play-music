import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListHeader } from './play-list-header';

describe('PlayListHeader', () => {
  let component: PlayListHeader;
  let fixture: ComponentFixture<PlayListHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayListHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayListHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
