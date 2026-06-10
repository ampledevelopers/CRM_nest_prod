import { TestBed } from '@angular/core/testing';

import { AdhesiveMasterService } from './adhesive-master.service';

describe('AdhesiveMasterService', () => {
  let service: AdhesiveMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdhesiveMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
