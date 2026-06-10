import { TestBed } from '@angular/core/testing';

import { AppleReviewDashboardService } from './apple-review-dashboard.service';

describe('AppleReviewDashboardService', () => {
  let service: AppleReviewDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppleReviewDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
