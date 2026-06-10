import { TestBed } from '@angular/core/testing';

import { PUDreportService } from './pudreport.service';

describe('PUDreportService', () => {
  let service: PUDreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PUDreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
