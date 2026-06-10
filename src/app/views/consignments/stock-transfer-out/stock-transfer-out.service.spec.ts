import { TestBed } from '@angular/core/testing';
import { StockTransferOutService } from './stock-transfer-out.service';


describe('StockTransferOutService', () => {
  let service: StockTransferOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTransferOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
