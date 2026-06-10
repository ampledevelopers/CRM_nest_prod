import { TestBed } from '@angular/core/testing';

import { OnsiteDcService } from './onsite-dc.service';

describe('OnsiteDcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnsiteDcService = TestBed.inject(OnsiteDcService);
    expect(service).toBeTruthy();
  });
});
