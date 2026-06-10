import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleReviewDashboardComponent } from './apple-review-dashboard.component';

describe('AppleReviewDashboardComponent', () => {
  let component: AppleReviewDashboardComponent;
  let fixture: ComponentFixture<AppleReviewDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppleReviewDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppleReviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
