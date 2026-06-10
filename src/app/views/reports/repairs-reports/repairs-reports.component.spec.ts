import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsReportsComponent } from './repairs-reports.component';

describe('RepairsReportsComponent', () => {
  let component: RepairsReportsComponent;
  let fixture: ComponentFixture<RepairsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
