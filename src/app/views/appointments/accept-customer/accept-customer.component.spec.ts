import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCustomerComponent } from './accept-customer.component';

describe('AcceptCustomerComponent', () => {
  let component: AcceptCustomerComponent;
  let fixture: ComponentFixture<AcceptCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
