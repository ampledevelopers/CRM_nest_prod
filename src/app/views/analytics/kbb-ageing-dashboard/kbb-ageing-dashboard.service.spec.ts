import { TestBed } from '@angular/core/testing';

import { KbbAgeingDashboardService } from './kbb-ageing-dashboard.service';

describe('KbbAgeingDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KbbAgeingDashboardService = TestBed.inject(KbbAgeingDashboardService);
    expect(service).toBeTruthy();
  });
});
