import { TestBed } from '@angular/core/testing';

import { SdrDashboardService } from './sdr-dashboard.service';

describe('SdrDashboardService', () => {
  let service: SdrDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdrDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
