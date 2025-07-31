import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGeneric } from './section-generic';

describe('SectionGeneric', () => {
  let component: SectionGeneric;
  let fixture: ComponentFixture<SectionGeneric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionGeneric]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionGeneric);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
