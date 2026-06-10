import { TestBed } from '@angular/core/testing';

import { AdhesiveConsumptionReportService } from './adhesive-consumption-report.service';

describe('AdhesiveConsumptionReportService', () => {
  let service: AdhesiveConsumptionReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdhesiveConsumptionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
