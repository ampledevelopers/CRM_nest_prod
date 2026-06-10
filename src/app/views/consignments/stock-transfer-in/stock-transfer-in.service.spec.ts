import { TestBed } from '@angular/core/testing';

import { StockTransferInService } from './stock-transfer-in.service';

describe('StockTransferInService', () => {
  let service: StockTransferInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTransferInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
