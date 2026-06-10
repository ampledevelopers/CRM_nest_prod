import { TestBed } from '@angular/core/testing';

import { MenulogreportService } from './menulogreport.service';

describe('MenulogreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenulogreportService = TestBed.inject(MenulogreportService);
    expect(service).toBeTruthy();
  });
});
