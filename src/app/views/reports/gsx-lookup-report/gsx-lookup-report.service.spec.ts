import { TestBed } from '@angular/core/testing';

import { GsxLookupReportService } from './gsx-lookup-report.service';

describe('GsxLookupReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GsxLookupReportService = TestBed.inject(GsxLookupReportService);
    expect(service).toBeTruthy();
  });
});
