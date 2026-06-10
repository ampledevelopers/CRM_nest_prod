import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBinAgeingDashboardComponent } from './branch-bin-ageing-dashboard.component';

describe('BranchBinAgeingDashboardComponent', () => {
  let component: BranchBinAgeingDashboardComponent;
  let fixture: ComponentFixture<BranchBinAgeingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchBinAgeingDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchBinAgeingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
