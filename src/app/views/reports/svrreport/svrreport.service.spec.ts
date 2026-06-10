import { TestBed } from '@angular/core/testing';

import { SvrreportService } from './svrreport.service';

describe('SvrreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvrreportService = TestBed.inject(SvrreportService);
    expect(service).toBeTruthy();
  });
});
