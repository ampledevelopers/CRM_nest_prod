import { TestBed } from '@angular/core/testing';

import { MissingDeviceService } from './missingdevice.service';
import { inject } from '@angular/core';

describe('AcseFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MissingDeviceService = TestBed.inject(MissingDeviceService);
    expect(service).toBeTruthy();
  });
});
