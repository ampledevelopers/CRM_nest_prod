import { TestBed } from '@angular/core/testing';

import { FeedbackreportService } from './feedbackreport.service';

describe('FeedbackreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedbackreportService = TestBed.inject(FeedbackreportService);
    expect(service).toBeTruthy();
  });
});
