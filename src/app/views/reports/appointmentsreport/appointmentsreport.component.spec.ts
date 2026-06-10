import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsreportComponent } from './appointmentsreport.component';

describe('AppointmentsreportComponent', () => {
  let component: AppointmentsreportComponent;
  let fixture: ComponentFixture<AppointmentsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
