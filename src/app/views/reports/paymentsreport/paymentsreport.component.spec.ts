import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentsreportComponent } from './paymentsreport.component';

describe('PaymentsreportComponent', () => {
  let component: PaymentsreportComponent;
  let fixture: ComponentFixture<PaymentsreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
