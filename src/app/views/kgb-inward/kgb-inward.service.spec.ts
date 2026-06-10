import { TestBed } from '@angular/core/testing';

import { KgbInwardService } from './kgb-inward.service';

describe('KgbInwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KgbInwardService = TestBed.inject(KgbInwardService);
    expect(service).toBeTruthy();
  });
});
