import { TestBed } from '@angular/core/testing';

import { PaymentsreportService } from './paymentsreport.service';

describe('PaymentsreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentsreportService = TestBed.inject(PaymentsreportService);
    expect(service).toBeTruthy();
  });
});
