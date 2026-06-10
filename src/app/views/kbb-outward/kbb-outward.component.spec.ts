import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KbbOutwardComponent } from './kbb-outward.component';

describe('KbbOutwardComponent', () => {
  let component: KbbOutwardComponent;
  let fixture: ComponentFixture<KbbOutwardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KbbOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbbOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
