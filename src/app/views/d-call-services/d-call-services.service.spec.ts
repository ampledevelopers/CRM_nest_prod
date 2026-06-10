import { TestBed } from '@angular/core/testing';

import { DCallServicesService } from './d-call-services.service';

describe('DCallServicesService', () => {
  let service: DCallServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DCallServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
