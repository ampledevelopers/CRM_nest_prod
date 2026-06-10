import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnquiryreportComponent } from './enquiryreport.component';

describe('EnquiryreportComponent', () => {
  let component: EnquiryreportComponent;
  let fixture: ComponentFixture<EnquiryreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
