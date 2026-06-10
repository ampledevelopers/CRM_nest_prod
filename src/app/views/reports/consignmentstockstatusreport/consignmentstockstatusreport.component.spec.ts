import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsignmentstockstatusreportComponent } from './consignmentstockstatusreport.component';

describe('ConsignmentstockstatusreportComponent', () => {
  let component: ConsignmentstockstatusreportComponent;
  let fixture: ComponentFixture<ConsignmentstockstatusreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignmentstockstatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignmentstockstatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
