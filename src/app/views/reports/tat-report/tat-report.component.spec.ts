import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TatReportComponent } from './tat-report.component';

describe('TatReportComponent', () => {
  let component: TatReportComponent;
  let fixture: ComponentFixture<TatReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TatReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TatReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
