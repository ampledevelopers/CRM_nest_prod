import { TestBed } from '@angular/core/testing';

import { AppointmentsreportService } from './appointmentsreport.service';

describe('AppointmentsreportService', () => {
  let service: AppointmentsreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentsreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
