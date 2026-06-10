import { TestBed } from '@angular/core/testing';

import { TekneConsignmentsService } from '../../tekne-consignments/tekne-consignments.service';

describe('TekneConsignmentsService', () => {
  let service: TekneConsignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TekneConsignmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
