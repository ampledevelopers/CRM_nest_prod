import { TestBed } from '@angular/core/testing';

import { KbbOutwardService } from './kbb-outward.service';

describe('KbbOutwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KbbOutwardService = TestBed.inject(KbbOutwardService);
    expect(service).toBeTruthy();
  });
});
