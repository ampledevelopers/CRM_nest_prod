import { TestBed } from '@angular/core/testing';

import { DayreportService } from './dayreport.service';

describe('DayreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayreportService = TestBed.inject(DayreportService);
    expect(service).toBeTruthy();
  });
});
