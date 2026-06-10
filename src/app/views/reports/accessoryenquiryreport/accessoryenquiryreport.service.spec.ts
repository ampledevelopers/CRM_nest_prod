import { TestBed } from '@angular/core/testing';

import { AccessoryenquiryreportService } from './accessoryenquiryreport.service';

describe('AccessoryenquiryreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessoryenquiryreportService = TestBed.get(AccessoryenquiryreportService);
    expect(service).toBeTruthy();
  });
});
