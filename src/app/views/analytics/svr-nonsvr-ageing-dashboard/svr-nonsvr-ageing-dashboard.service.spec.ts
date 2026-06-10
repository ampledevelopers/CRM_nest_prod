import { TestBed } from '@angular/core/testing';

import { SvrNonsvrAgeingDashboardService } from './svr-nonsvr-ageing-dashboard.service';

describe('SvrNonsvrAgeingDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvrNonsvrAgeingDashboardService = TestBed.inject(SvrNonsvrAgeingDashboardService);
    expect(service).toBeTruthy();
  });
});
