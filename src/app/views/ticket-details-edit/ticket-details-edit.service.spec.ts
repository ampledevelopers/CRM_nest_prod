import { TestBed } from '@angular/core/testing';

import { TicketDetailsEditService } from './ticket-details-edit.service';

describe('TicketDetailsEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketDetailsEditService = TestBed.inject(TicketDetailsEditService);
    expect(service).toBeTruthy();
  });
});
