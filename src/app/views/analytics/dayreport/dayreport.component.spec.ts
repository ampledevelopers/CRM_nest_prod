import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayreportComponent } from './dayreport.component';

describe('DayreportComponent', () => {
  let component: DayreportComponent;
  let fixture: ComponentFixture<DayreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
