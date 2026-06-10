import { TestBed } from '@angular/core/testing';

import { NewTicketService } from './new-ticket.service';

describe('NewTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewTicketService = TestBed.inject(NewTicketService);
    expect(service).toBeTruthy();
  });
});
