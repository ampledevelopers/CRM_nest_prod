import { TestBed } from '@angular/core/testing';

import { CreatePudTicketService } from './create-pud-ticket.service';

describe('CreatePudTicketService', () => {
  let service: CreatePudTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePudTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
