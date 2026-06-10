import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceReportsComponent } from './compliance-reports.component';

describe('ComplianceReportsComponent', () => {
  let component: ComplianceReportsComponent;
  let fixture: ComponentFixture<ComplianceReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
