import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListBody } from './play-list-body';

describe('PlayListBody', () => {
  let component: PlayListBody;
  let fixture: ComponentFixture<PlayListBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayListBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayListBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
