import { TestBed } from '@angular/core/testing';

import { StatusDashboardService } from './status-dashboard.service';

describe('StatusDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusDashboardService = TestBed.inject(StatusDashboardService);
    expect(service).toBeTruthy();
  });
});
