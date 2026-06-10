import { TestBed } from '@angular/core/testing';

import { PartAddEditService } from './part-add-edit.service';

describe('PartAddEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartAddEditService = TestBed.inject(PartAddEditService);
    expect(service).toBeTruthy();
  });
});
