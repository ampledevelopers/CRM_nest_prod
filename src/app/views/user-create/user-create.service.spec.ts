import { RelocateEnggService } from './../relocate-engg/relocate-engg.service';
import { TestBed } from '@angular/core/testing';


describe('RelocateEnggService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelocateEnggService = TestBed.inject(RelocateEnggService);
    expect(service).toBeTruthy();
  });
});
