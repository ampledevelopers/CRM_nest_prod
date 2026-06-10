import { TestBed } from '@angular/core/testing';

import { CsatWeeklyTrendReportService } from './csat-weekly-trend-report.service';

describe('CsatWeeklyTrendReportService', () => {
  let service: CsatWeeklyTrendReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsatWeeklyTrendReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
