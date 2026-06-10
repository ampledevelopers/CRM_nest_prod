import { TestBed } from '@angular/core/testing';

import { CEODashboardService } from './ceo-dashboard.service';

describe('CEODashboardService', () => {
  let service: CEODashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CEODashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
