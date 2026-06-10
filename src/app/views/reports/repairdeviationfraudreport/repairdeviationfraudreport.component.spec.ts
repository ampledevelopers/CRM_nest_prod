import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepairdeviationfraudreportComponent } from './repairdeviationfraudreport.component';

describe('RepairdeviationfraudreportComponent', () => {
  let component: RepairdeviationfraudreportComponent;
  let fixture: ComponentFixture<RepairdeviationfraudreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairdeviationfraudreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairdeviationfraudreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
