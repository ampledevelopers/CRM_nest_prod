import { TestBed } from '@angular/core/testing';

import { TechnicianDashboardService } from './technician-dashboard.service';

describe('TechnicianDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechnicianDashboardService = TestBed.inject(TechnicianDashboardService);
    expect(service).toBeTruthy();
  });
});
