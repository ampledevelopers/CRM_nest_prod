import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvrNonsvrAgeingDashboardComponent } from './svr-nonsvr-ageing-dashboard.component';

describe('SvrNonsvrAgeingDashboardComponent', () => {
  let component: SvrNonsvrAgeingDashboardComponent;
  let fixture: ComponentFixture<SvrNonsvrAgeingDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SvrNonsvrAgeingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvrNonsvrAgeingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
