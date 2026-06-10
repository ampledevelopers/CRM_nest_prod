import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRepairsDashboardComponent } from './product-repairs-dashboard.component';

describe('ProductRepairsDashboardComponent', () => {
  let component: ProductRepairsDashboardComponent;
  let fixture: ComponentFixture<ProductRepairsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRepairsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRepairsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
