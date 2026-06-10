import { TestBed } from '@angular/core/testing';

import { RepairApprovalDashboardService } from './repair-approval-dashboard.service';

describe('RepairApprovalDashboardService', () => {
  let service: RepairApprovalDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairApprovalDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
