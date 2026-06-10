import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEODashboardComponent } from './ceo-dashboard.component';

describe('CEODashboardComponent', () => {
  let component: CEODashboardComponent;
  let fixture: ComponentFixture<CEODashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEODashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEODashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
