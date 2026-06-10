import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckWarrantyComponent } from './check-warranty.component';

describe('CheckWarrantyComponent', () => {
  let component: CheckWarrantyComponent;
  let fixture: ComponentFixture<CheckWarrantyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckWarrantyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
