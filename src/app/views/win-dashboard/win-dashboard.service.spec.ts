import { TestBed } from '@angular/core/testing';
import { WinDashboardService } from './win-dashboard.service';

describe('WinDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WinDashboardService = TestBed.inject(WinDashboardService);
    expect(service).toBeTruthy();
  });
});
