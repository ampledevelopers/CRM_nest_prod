import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDataUploadComponent } from './dashboard-data-upload.component';

describe('DashboardDataUploadComponent', () => {
  let component: DashboardDataUploadComponent;
  let fixture: ComponentFixture<DashboardDataUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDataUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
