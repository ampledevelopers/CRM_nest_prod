import { TestBed } from '@angular/core/testing';

import { PudServicesService } from './pud-services.service';

describe('PudServicesService', () => {
  let service: PudServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PudServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
