import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteConversionReportComponent } from './quote-conversion-report.component';

describe('QuoteConversionReportComponent', () => {
  let component: QuoteConversionReportComponent;
  let fixture: ComponentFixture<QuoteConversionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteConversionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteConversionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
