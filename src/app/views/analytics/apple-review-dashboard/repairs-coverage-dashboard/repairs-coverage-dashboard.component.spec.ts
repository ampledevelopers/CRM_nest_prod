import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsCoverageDashboardComponent } from './repairs-coverage-dashboard.component';

describe('RepairsCoverageDashboardComponent', () => {
  let component: RepairsCoverageDashboardComponent;
  let fixture: ComponentFixture<RepairsCoverageDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsCoverageDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsCoverageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
