import { TestBed } from '@angular/core/testing';

import { DlDcService } from './dl-dc.service';

describe('DlDcService', () => {
  let service: DlDcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DlDcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
