import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianPerformanceNegetiveComponent } from './technician-performance-negetive.component';

describe('TechnicianPerformanceNegetiveComponent', () => {
  let component: TechnicianPerformanceNegetiveComponent;
  let fixture: ComponentFixture<TechnicianPerformanceNegetiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianPerformanceNegetiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianPerformanceNegetiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
