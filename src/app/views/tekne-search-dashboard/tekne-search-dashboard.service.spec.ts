import { TestBed } from '@angular/core/testing';

import { TekneSearchDashboardService } from './tekne-search-dashboard.service';

describe('TekneSearchDashboardService', () => {
  let service: TekneSearchDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TekneSearchDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
