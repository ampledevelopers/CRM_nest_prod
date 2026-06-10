import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CcEnquiryUpdateComponent } from './cc-enquiry-update.component';

describe('CcEnquiryUpdateComponent', () => {
  let component: CcEnquiryUpdateComponent;
  let fixture: ComponentFixture<CcEnquiryUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CcEnquiryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcEnquiryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
