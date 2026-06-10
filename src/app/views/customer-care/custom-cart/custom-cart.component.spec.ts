import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomCartComponent } from './custom-cart.component';

describe('CustomCartComponent', () => {
  let component: CustomCartComponent;
  let fixture: ComponentFixture<CustomCartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
