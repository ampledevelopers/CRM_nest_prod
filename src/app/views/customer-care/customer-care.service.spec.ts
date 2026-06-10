import { TestBed } from '@angular/core/testing';

import { CustomerCareService } from './customer-care.service';

describe('CustomerCareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerCareService = TestBed.inject(CustomerCareService);
    expect(service).toBeTruthy();
  });
});
