import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccessoryenquiryreportComponent } from './accessoryenquiryreport.component';

describe('AccessoryenquiryreportComponent', () => {
  let component: AccessoryenquiryreportComponent;
  let fixture: ComponentFixture<AccessoryenquiryreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryenquiryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryenquiryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
