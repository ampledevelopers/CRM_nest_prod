import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinAgeingDashboardComponent } from './bin-ageing-dashboard.component';

describe('BinAgeingDashboardComponent', () => {
  let component: BinAgeingDashboardComponent;
  let fixture: ComponentFixture<BinAgeingDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BinAgeingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinAgeingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
