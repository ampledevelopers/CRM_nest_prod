import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MissingDeviceComponent } from './missingdevice.component';

describe('MissingDeviceComponent', () => {
  let component: MissingDeviceComponent;
  let fixture: ComponentFixture<MissingDeviceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
