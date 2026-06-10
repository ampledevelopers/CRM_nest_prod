import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairApprovalDashboardComponent } from './repair-approval-dashboard.component';

describe('RepairApprovalDashboardComponent', () => {
  let component: RepairApprovalDashboardComponent;
  let fixture: ComponentFixture<RepairApprovalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairApprovalDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairApprovalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
