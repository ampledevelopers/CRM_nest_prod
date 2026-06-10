import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { GoogleMapsModule } from '@angular/google-maps';
import { CardModule } from '@coreui/angular-pro';
import { DocsComponentsModule } from '../../../../components';
import { GoogleMapsComponent } from './google-maps.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GoogleMapsComponent', () => {
  let component: GoogleMapsComponent;
  let fixture: ComponentFixture<GoogleMapsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [GoogleMapsComponent],
    imports: [CardModule, GoogleMapsModule, DocsComponentsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
