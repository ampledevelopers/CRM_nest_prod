import { TestBed } from '@angular/core/testing';

import { RepairdeviationfraudreportService } from './repairdeviationfraudreport.service';

describe('RepairdeviationfraudreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairdeviationfraudreportService = TestBed.inject(RepairdeviationfraudreportService);
    expect(service).toBeTruthy();
  });
});
