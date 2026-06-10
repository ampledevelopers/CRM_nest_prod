import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootFallDashboardComponent } from './foot-fall-dashboard.component';

describe('FootFallDashboardComponent', () => {
  let component: FootFallDashboardComponent;
  let fixture: ComponentFixture<FootFallDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootFallDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootFallDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
