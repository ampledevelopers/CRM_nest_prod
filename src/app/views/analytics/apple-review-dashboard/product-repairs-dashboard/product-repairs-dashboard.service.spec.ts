import { TestBed } from '@angular/core/testing';

import { ProductRepairsDashboardService } from './product-repairs-dashboard.service';

describe('ProductRepairsDashboardService', () => {
  let service: ProductRepairsDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRepairsDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
