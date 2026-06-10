import { TestBed } from '@angular/core/testing';

import { AtlasreportService } from './atlasreport.service';

describe('AtlasreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtlasreportService = TestBed.inject(AtlasreportService);
    expect(service).toBeTruthy();
  });
});
