import { TestBed } from '@angular/core/testing';

import { ConsignmentstockstatusreportService } from './consignmentstockstatusreport.service';

describe('ConsignmentstockstatusreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsignmentstockstatusreportService = TestBed.inject(ConsignmentstockstatusreportService);
    expect(service).toBeTruthy();
  });
});
