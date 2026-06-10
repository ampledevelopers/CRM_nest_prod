import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekneSearchDashboardComponent } from './tekne-search-dashboard.component';

describe('TekneSearchDashboardComponent', () => {
  let component: TekneSearchDashboardComponent;
  let fixture: ComponentFixture<TekneSearchDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TekneSearchDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TekneSearchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
