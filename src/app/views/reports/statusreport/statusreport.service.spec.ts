import { TestBed } from '@angular/core/testing';

import { StatusreportService } from './statusreport.service';

describe('StatusreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusreportService = TestBed.inject(StatusreportService);
    expect(service).toBeTruthy();
  });
});
