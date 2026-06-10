import { TestBed } from '@angular/core/testing';

import { GsxReimbursementReportService } from './gsx-reimbursement-report.service';

describe('GsxReimbursementReportService', () => {
  let service: GsxReimbursementReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsxReimbursementReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
