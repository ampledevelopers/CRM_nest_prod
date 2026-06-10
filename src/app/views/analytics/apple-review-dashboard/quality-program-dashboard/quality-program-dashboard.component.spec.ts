import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityProgramDashboardComponent } from './quality-program-dashboard.component';

describe('QualityProgramDashboardComponent', () => {
  let component: QualityProgramDashboardComponent;
  let fixture: ComponentFixture<QualityProgramDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityProgramDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityProgramDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
