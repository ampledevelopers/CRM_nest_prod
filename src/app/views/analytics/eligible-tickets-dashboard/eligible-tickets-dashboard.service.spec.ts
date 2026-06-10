import { TestBed } from '@angular/core/testing';

import { EligibleTicketsDashboardService } from './eligible-tickets-dashboard.service';

describe('EligibleTicketsDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EligibleTicketsDashboardService = TestBed.inject(EligibleTicketsDashboardService);
    expect(service).toBeTruthy();
  });
});
