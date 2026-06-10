import { TestBed } from '@angular/core/testing';

import { GsxFlatReportService } from './gsx-flat-report.service';

describe('GsxFlatReportService', () => {
  let service: GsxFlatReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsxFlatReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
