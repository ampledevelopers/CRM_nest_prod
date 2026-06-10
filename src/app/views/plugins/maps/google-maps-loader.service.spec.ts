import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { GoogleMapsLoaderService } from './google-maps-loader.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GoogleMapsLoaderService', () => {
  let service: GoogleMapsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(GoogleMapsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
