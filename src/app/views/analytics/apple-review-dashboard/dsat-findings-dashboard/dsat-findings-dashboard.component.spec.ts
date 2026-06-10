import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsatFindingsDashboardComponent } from './dsat-findings-dashboard.component';

describe('DsatFindingsDashboardComponent', () => {
  let component: DsatFindingsDashboardComponent;
  let fixture: ComponentFixture<DsatFindingsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsatFindingsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsatFindingsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
