import { TestBed } from '@angular/core/testing';

import { EnquiryreportService } from './enquiryreport.service';

describe('EnquiryreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnquiryreportService = TestBed.inject(EnquiryreportService);
    expect(service).toBeTruthy();
  });
});
