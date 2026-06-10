import { TestBed } from '@angular/core/testing';
import { RepairsCoverageDashboardService } from './repairs-coverage-dashboard.service';

describe('RepairsCoverageDashboardService', () => {
  let service: RepairsCoverageDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairsCoverageDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
