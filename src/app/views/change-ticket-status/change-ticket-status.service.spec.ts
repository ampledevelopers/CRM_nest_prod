import { TestBed } from '@angular/core/testing';

import { ChangeTicketStatusService } from './change-ticket-status.service';

describe('ChangeTicketStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeTicketStatusService = TestBed.inject(ChangeTicketStatusService);
    expect(service).toBeTruthy();
  });
});
