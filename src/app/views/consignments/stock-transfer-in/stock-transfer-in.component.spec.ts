import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferInComponent } from './stock-transfer-in.component';

describe('StockTransferInComponent', () => {
  let component: StockTransferInComponent;
  let fixture: ComponentFixture<StockTransferInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTransferInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockTransferInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
