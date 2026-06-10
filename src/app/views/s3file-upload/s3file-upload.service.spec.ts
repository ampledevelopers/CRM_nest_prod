import { TestBed } from '@angular/core/testing';

import { S3fileUploadService } from './s3file-upload.service';

describe('S3fileUploadService', () => {
  let service: S3fileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S3fileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
