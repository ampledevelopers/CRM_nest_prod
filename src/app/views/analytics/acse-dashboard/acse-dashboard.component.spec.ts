import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcseDashboardComponent } from './acse-dashboard.component';

describe('AcseDashboardComponent', () => {
  let component: AcseDashboardComponent;
  let fixture: ComponentFixture<AcseDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
