import { TestBed } from '@angular/core/testing';

import { TechnicianPerformanceService } from './technician-performance.service';

describe('TechnicianPerformanceService', () => {
  let service: TechnicianPerformanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicianPerformanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
