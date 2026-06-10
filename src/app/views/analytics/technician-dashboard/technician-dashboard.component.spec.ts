import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TechnicianDashboardComponent } from './technician-dashboard.component';

describe('TechnicianDashboardComponent', () => {
  let component: TechnicianDashboardComponent;
  let fixture: ComponentFixture<TechnicianDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
