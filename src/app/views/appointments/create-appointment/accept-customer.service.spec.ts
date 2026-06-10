import { TestBed } from '@angular/core/testing';

import { AcceptCustomerService } from './accept-customer.service';

describe('AcceptCustomerService', () => {
  let service: AcceptCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
