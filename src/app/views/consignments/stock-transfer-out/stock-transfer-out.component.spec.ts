import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferOutComponent } from './stock-transfer-out.component';

describe('StockTransferOutComponent', () => {
  let component: StockTransferOutComponent;
  let fixture: ComponentFixture<StockTransferOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTransferOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockTransferOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
