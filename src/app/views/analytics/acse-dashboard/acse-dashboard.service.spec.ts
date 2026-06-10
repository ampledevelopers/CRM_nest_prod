import { TestBed } from '@angular/core/testing';

import { AcseDashboardService } from './acse-dashboard.service';

describe('AcseDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcseDashboardService = TestBed.get(AcseDashboardService);
    expect(service).toBeTruthy();
  });
});
