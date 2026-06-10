import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsReportTekneComponent } from './repairs-report-tekne.component';

describe('RepairsReportTekneComponent', () => {
  let component: RepairsReportTekneComponent;
  let fixture: ComponentFixture<RepairsReportTekneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsReportTekneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsReportTekneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
