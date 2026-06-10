import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEnquiryComponent } from './create-enquiry.component';

describe('CreateEnquiryComponent', () => {
  let component: CreateEnquiryComponent;
  let fixture: ComponentFixture<CreateEnquiryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
