import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsxLookupReportComponent } from './gsx-lookup-report.component';

describe('GsxLookupReportComponent', () => {
  let component: GsxLookupReportComponent;
  let fixture: ComponentFixture<GsxLookupReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsxLookupReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsxLookupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
