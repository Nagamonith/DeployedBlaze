import { TestBed } from '@angular/core/testing';

import { LeftbarService } from './leftbar.service';

describe('LeftbartreeService', () => {
  let service: LeftbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
