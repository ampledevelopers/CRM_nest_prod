import { TestBed } from '@angular/core/testing';

import { CsatPeriodReportService } from './csat-period-report.service';

describe('CsatPeriodReportService', () => {
  let service: CsatPeriodReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsatPeriodReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
