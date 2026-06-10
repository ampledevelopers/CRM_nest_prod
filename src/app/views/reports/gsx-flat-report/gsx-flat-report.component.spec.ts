import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsxFlatReportComponent } from './gsx-flat-report.component';

describe('GsxFlatReportComponent', () => {
  let component: GsxFlatReportComponent;
  let fixture: ComponentFixture<GsxFlatReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsxFlatReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsxFlatReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
