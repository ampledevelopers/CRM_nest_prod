import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuarterlyreportComponent } from './quarterlyreport.component';

describe('QuarterlyreportComponent', () => {
  let component: QuarterlyreportComponent;
  let fixture: ComponentFixture<QuarterlyreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterlyreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
