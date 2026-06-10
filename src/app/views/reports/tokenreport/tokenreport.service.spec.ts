import { TestBed } from '@angular/core/testing';

import { TokenreportService } from './tokenreport.service';

describe('TokenreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenreportService = TestBed.inject(TokenreportService);
    expect(service).toBeTruthy();
  });
});
