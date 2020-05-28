import { TestBed } from '@angular/core/testing';

import { RsaKeygenService } from './rsa-keygen.service';

describe('RsaKeygenService', () => {
  let service: RsaKeygenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsaKeygenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
