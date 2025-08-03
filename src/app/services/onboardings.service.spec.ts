import { TestBed } from '@angular/core/testing';

import { OnboardingsService } from './onboardings.service';

describe('OnboardingsService', () => {
  let service: OnboardingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
