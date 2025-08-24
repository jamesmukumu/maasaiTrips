import { TestBed } from '@angular/core/testing';

import { CustomizedPackageService } from './customized-package.service';

describe('CustomizedPackageService', () => {
  let service: CustomizedPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizedPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
