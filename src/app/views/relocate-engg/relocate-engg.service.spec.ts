import { TestBed } from '@angular/core/testing';

import { RelocateEnggService } from './relocate-engg.service';

describe('RelocateEnggService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelocateEnggService = TestBed.inject(RelocateEnggService);
    expect(service).toBeTruthy();
  });
});
