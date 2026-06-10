import { TestBed } from '@angular/core/testing';

import { InventoryDashboardService } from './inventory-dashboard.service';

describe('InventoryDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryDashboardService = TestBed.inject(InventoryDashboardService);
    expect(service).toBeTruthy();
  });
});
