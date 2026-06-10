import { TestBed } from '@angular/core/testing';

import { DashboardDataUploadService } from './dashboard-data-upload.service';

describe('DashboardDataUploadService', () => {
  let service: DashboardDataUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDataUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
