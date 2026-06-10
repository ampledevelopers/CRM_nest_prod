import { TestBed } from '@angular/core/testing';

import { FootFallDashboardService } from './foot-fall-dashboard.service';

describe('FootFallDashboardService', () => {
  let service: FootFallDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootFallDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
