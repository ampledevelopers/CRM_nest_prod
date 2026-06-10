import {  ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { SvrDashboardComponent } from './svr-dashboard.component';

describe('SvrDashboardComponent', () => {
  let component: SvrDashboardComponent;
  let fixture: ComponentFixture<SvrDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SvrDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
