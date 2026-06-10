import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PudServicesComponent } from './pud-services.component';

describe('PudServicesComponent', () => {
  let component: PudServicesComponent;
  let fixture: ComponentFixture<PudServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PudServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PudServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
