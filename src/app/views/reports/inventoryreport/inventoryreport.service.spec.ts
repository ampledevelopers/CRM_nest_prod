import { TestBed } from '@angular/core/testing';

import { InventoryreportService } from './inventoryreport.service';

describe('InventoryreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryreportService = TestBed.inject(InventoryreportService);
    expect(service).toBeTruthy();
  });
});
