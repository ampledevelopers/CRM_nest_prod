import { TestBed } from '@angular/core/testing';

import { TatReportService } from './tat-report.service';

describe('TatReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TatReportService = TestBed.inject(TatReportService);
    expect(service).toBeTruthy();
  });
});
