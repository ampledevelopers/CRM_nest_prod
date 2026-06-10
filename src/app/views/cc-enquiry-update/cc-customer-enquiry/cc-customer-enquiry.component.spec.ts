import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CcCustomerEnquiryComponent } from './cc-customer-enquiry.component';

describe('CcCustomerEnquiryComponent', () => {
  let component: CcCustomerEnquiryComponent;
  let fixture: ComponentFixture<CcCustomerEnquiryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CcCustomerEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcCustomerEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
