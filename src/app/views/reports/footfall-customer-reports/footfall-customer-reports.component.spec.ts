import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootfallCustomerReportsComponent } from './footfall-customer-reports.component';

describe('FootfallCustomerReportsComponent', () => {
  let component: FootfallCustomerReportsComponent;
  let fixture: ComponentFixture<FootfallCustomerReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootfallCustomerReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootfallCustomerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
