import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KbbReturnReportComponent } from './kbb-return-report.component';

describe('KbbReturnReportComponent', () => {
  let component: KbbReturnReportComponent;
  let fixture: ComponentFixture<KbbReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KbbReturnReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KbbReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
