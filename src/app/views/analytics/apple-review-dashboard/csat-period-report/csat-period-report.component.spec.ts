import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsatPeriodReportComponent } from './csat-period-report.component';

describe('CsatPeriodReportComponent', () => {
  let component: CsatPeriodReportComponent;
  let fixture: ComponentFixture<CsatPeriodReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsatPeriodReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsatPeriodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
