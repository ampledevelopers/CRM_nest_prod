import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepairsreportComponent } from './repairsreport.component';

describe('RepairsreportComponent', () => {
  let component: RepairsreportComponent;
  let fixture: ComponentFixture<RepairsreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
