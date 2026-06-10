import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatusreportComponent } from './statusreport.component';

describe('StatusreportComponent', () => {
  let component: StatusreportComponent;
  let fixture: ComponentFixture<StatusreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
