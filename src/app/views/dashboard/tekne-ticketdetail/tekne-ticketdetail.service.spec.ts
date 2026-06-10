import { TestBed } from '@angular/core/testing';

import { TekneTicketdetailService } from '../../../tekne-ticketdetail.service';

describe('TekneTicketdetailService', () => {
  let service: TekneTicketdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TekneTicketdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
