import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekneConsignmentsComponent } from './tekne-consignments/tekne-consignments.component';

describe('TekneConsignmentsComponent', () => {
  let component: TekneConsignmentsComponent;
  let fixture: ComponentFixture<TekneConsignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TekneConsignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TekneConsignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
