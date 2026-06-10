import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EligibleTicketsDashboardComponent } from './eligible-tickets-dashboard.component';

describe('EligibleTicketsDashboardComponent', () => {
  let component: EligibleTicketsDashboardComponent;
  let fixture: ComponentFixture<EligibleTicketsDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibleTicketsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibleTicketsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
