import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KbbAgeingDashboardComponent } from './kbb-ageing-dashboard.component';

describe('KbbAgeingDashboardComponent', () => {
  let component: KbbAgeingDashboardComponent;
  let fixture: ComponentFixture<KbbAgeingDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KbbAgeingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbbAgeingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
