import { TestBed } from '@angular/core/testing';

import { RepairsreportService } from './repairsreport.service';

describe('RepairsreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairsreportService = TestBed.inject(RepairsreportService);
    expect(service).toBeTruthy();
  });
});
