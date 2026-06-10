import { TestBed } from '@angular/core/testing';

import { UpdateAgeingTimeService } from './update-ageing-time.service';

describe('UpdateAgeingTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateAgeingTimeService = TestBed.inject(UpdateAgeingTimeService);
    expect(service).toBeTruthy();
  });
});
