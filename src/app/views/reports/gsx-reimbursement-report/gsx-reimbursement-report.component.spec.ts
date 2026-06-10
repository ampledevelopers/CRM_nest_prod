import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsxReimbursementReportComponent } from './gsx-reimbursement-report.component';

describe('GsxReimbursementReportComponent', () => {
  let component: GsxReimbursementReportComponent;
  let fixture: ComponentFixture<GsxReimbursementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsxReimbursementReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsxReimbursementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
