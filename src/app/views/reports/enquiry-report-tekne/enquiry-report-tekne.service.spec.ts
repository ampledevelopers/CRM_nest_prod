import { TestBed } from '@angular/core/testing';

import { EnquiryReportTekneService } from '../../../enquiry-report-tekne.service';

describe('EnquiryReportTekneService', () => {
  let service: EnquiryReportTekneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryReportTekneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
