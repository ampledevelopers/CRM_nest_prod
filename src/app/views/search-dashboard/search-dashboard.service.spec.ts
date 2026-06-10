import { TestBed } from '@angular/core/testing';

import { SearchDashboardService } from './search-dashboard.service';

describe('SearchDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchDashboardService = TestBed.inject(SearchDashboardService);
    expect(service).toBeTruthy();
  });
});
