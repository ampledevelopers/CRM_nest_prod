import { TestBed } from '@angular/core/testing';

import { CcEnquiryUpdateService } from './cc-enquiry-update.service';

describe('CcEnquiryUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CcEnquiryUpdateService = TestBed.get(CcEnquiryUpdateService);
    expect(service).toBeTruthy();
  });
});
