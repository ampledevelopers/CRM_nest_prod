import { TestBed } from '@angular/core/testing';

import { QuarterlyreportService } from './quarterlyreport.service';

describe('QuarterlyreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuarterlyreportService = TestBed.inject(QuarterlyreportService);
    expect(service).toBeTruthy();
  });
});
