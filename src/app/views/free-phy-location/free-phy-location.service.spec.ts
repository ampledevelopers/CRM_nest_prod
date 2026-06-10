import { TestBed } from '@angular/core/testing';

import { FreePhyLocationService } from './free-phy-location.service';

describe('FreePhyLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FreePhyLocationService = TestBed.inject(FreePhyLocationService);
    expect(service).toBeTruthy();
  });
});
