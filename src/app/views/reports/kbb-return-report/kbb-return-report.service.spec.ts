import { TestBed } from '@angular/core/testing';

import { KbbReturnReportService } from './kbb-return-report.service';

describe('KbbReturnReportService', () => {
  let service: KbbReturnReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KbbReturnReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
