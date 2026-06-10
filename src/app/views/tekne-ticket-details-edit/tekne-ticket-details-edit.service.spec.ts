import { TestBed } from '@angular/core/testing';

import { TekneTicketDetailsEditService } from './tekne-ticket-details-edit.service';

describe('TekneTicketDetailsEditService', () => {
  let service: TekneTicketDetailsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TekneTicketDetailsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
