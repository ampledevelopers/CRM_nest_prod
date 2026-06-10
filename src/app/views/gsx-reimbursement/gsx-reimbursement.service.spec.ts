import { TestBed } from '@angular/core/testing';

import { GSXReimbursementService } from './gsx-reimbursement.service';

describe('GSXReimbursementService', () => {
  let service: GSXReimbursementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GSXReimbursementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
