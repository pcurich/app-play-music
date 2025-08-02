import { TestBed } from '@angular/core/testing';

import { AppCookieService } from './cookie.service';

describe('AppCookieService', () => {
  let service: AppCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
