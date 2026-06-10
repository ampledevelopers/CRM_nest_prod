import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedbackreportComponent } from './feedbackreport.component';

describe('FeedbackreportComponent', () => {
  let component: FeedbackreportComponent;
  let fixture: ComponentFixture<FeedbackreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
