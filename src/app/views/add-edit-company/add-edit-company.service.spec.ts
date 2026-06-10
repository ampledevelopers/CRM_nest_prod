import { TestBed } from '@angular/core/testing';

import { AddEditCompanyService } from './add-edit-company.service';

describe('AddEditCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEditCompanyService = TestBed.inject(AddEditCompanyService);
    expect(service).toBeTruthy();
  });
});
