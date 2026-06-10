import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsatWeeklyTrendReportComponent } from './csat-weekly-trend-report.component';

describe('CsatWeeklyTrendReportComponent', () => {
  let component: CsatWeeklyTrendReportComponent;
  let fixture: ComponentFixture<CsatWeeklyTrendReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsatWeeklyTrendReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsatWeeklyTrendReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
