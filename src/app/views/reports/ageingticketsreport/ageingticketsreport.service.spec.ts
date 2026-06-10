import { TestBed } from '@angular/core/testing';

import { AgeingticketsreportService } from './ageingticketsreport.service';

describe('AgeingticketsreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgeingticketsreportService = TestBed.inject(AgeingticketsreportService);
    expect(service).toBeTruthy();
  });
});
