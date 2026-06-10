import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhesiveConsumptionReportComponent } from './adhesive-consumption-report.component';

describe('AdhesiveConsumptionReportComponent', () => {
  let component: AdhesiveConsumptionReportComponent;
  let fixture: ComponentFixture<AdhesiveConsumptionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhesiveConsumptionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhesiveConsumptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
