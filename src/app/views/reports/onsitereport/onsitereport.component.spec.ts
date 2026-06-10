import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OnsitereportComponent } from './onsitereport.component';

describe('OnsitereportComponent', () => {
  let component: OnsitereportComponent;
  let fixture: ComponentFixture<OnsitereportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsitereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsitereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
