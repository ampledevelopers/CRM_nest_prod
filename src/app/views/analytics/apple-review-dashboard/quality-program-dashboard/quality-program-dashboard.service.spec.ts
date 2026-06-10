import { TestBed } from '@angular/core/testing';

import { QualityProgramDashboardService } from './quality-program-dashboard.service';

describe('QualityProgramDashboardService', () => {
  let service: QualityProgramDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityProgramDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
