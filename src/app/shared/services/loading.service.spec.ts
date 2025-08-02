import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  const service: LoadingService = TestBed.inject(LoadingService);

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
