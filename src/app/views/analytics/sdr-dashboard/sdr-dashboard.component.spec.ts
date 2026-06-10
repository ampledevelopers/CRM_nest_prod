import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdrDashboardComponent } from './sdr-dashboard.component';

describe('SdrDashboardComponent', () => {
  let component: SdrDashboardComponent;
  let fixture: ComponentFixture<SdrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdrDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
