import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GSXReimbursementComponent } from './gsx-reimbursement.component';

describe('GSXReimbursementComponent', () => {
  let component: GSXReimbursementComponent;
  let fixture: ComponentFixture<GSXReimbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GSXReimbursementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GSXReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
