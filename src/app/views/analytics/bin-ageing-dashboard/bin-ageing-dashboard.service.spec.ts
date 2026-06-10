import { TestBed } from '@angular/core/testing';

import { BinAgeingDashboardService } from './bin-ageing-dashboard.service';

describe('BinAgeingDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BinAgeingDashboardService = TestBed.inject(BinAgeingDashboardService);
    expect(service).toBeTruthy();
  });
});
