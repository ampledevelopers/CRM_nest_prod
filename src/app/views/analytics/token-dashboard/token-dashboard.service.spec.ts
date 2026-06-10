import { TestBed } from '@angular/core/testing';

import { TokenDashboardService } from './token-dashboard.service';

describe('TokenDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenDashboardService = TestBed.inject(TokenDashboardService);
    expect(service).toBeTruthy();
  });
});
