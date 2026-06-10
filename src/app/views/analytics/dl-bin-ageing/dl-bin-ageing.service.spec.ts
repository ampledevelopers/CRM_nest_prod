import { TestBed } from '@angular/core/testing';

import { DLBinAgeingService } from './dl-bin-ageing.service';

describe('DLBinAgeingService', () => {
  let service: DLBinAgeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DLBinAgeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
