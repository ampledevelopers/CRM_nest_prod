import { TestBed } from '@angular/core/testing';

import { SvrDashboardService } from './svr-dashboard.service';

describe('SvrDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvrDashboardService = TestBed.inject(SvrDashboardService);
    expect(service).toBeTruthy();
  });
});
