import { TestBed } from '@angular/core/testing';

import { ConsignmentsService } from './consignments.service';

describe('ConsignmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsignmentsService = TestBed.inject(ConsignmentsService);
    expect(service).toBeTruthy();
  });
});
