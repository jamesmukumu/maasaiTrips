import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { destinationsResolver } from './destinations.resolver';

describe('destinationsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => destinationsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
