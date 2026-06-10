import { TestBed } from '@angular/core/testing';

import { QuoteConversionReportService } from './quote-conversion-report.service';

describe('QuoteConversionReportService', () => {
  let service: QuoteConversionReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteConversionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
