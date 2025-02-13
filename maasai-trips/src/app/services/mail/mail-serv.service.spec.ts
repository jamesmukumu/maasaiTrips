import { TestBed } from '@angular/core/testing';

import { MailServService } from './mail-serv.service';

describe('MailServService', () => {
  let service: MailServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
