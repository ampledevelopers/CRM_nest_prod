import { TestBed } from '@angular/core/testing';

import { AcseFormService } from './acse-form.service';
import { inject } from '@angular/core';

describe('AcseFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcseFormService = TestBed.inject(AcseFormService);
    expect(service).toBeTruthy();
  });
});
