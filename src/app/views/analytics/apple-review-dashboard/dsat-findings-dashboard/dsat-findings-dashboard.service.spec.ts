import { TestBed } from '@angular/core/testing';

import { DsatFindingsDashboardService } from './dsat-findings-dashboard.service';

describe('DsatFindingsDashboardService', () => {
  let service: DsatFindingsDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsatFindingsDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
