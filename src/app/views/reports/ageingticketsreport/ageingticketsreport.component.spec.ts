import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AgeingticketsreportComponent } from './ageingticketsreport.component';

describe('AgeingticketsreportComponent', () => {
  let component: AgeingticketsreportComponent;
  let fixture: ComponentFixture<AgeingticketsreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeingticketsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeingticketsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
