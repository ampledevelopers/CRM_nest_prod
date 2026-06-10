import { TestBed } from '@angular/core/testing';

import { OnsitereportService } from './onsitereport.service';

describe('OnsitereportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnsitereportService = TestBed.inject(OnsitereportService);
    expect(service).toBeTruthy();
  });
});
