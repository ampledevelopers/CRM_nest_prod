import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryReportTekneComponent } from './enquiry-report-tekne.component';

describe('EnquiryReportTekneComponent', () => {
  let component: EnquiryReportTekneComponent;
  let fixture: ComponentFixture<EnquiryReportTekneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryReportTekneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryReportTekneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
