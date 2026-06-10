import { TestBed } from '@angular/core/testing';

import { DayReportService } from './day-report.service';

describe('DayReportService', () => {
  let service: DayReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
