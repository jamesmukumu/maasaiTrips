import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { packagesResolver } from './packages.resolver';

describe('packagesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => packagesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
