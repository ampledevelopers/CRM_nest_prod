import { TestBed } from '@angular/core/testing';

import { RepairsReportTekneService } from '../../../repairs-report-tekne.service';

describe('RepairsReportTekneService', () => {
  let service: RepairsReportTekneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairsReportTekneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
