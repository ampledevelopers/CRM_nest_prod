import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEditCompanyComponent } from './add-edit-company.component';

describe('AddEditCompanyComponent', () => {
  let component: AddEditCompanyComponent;
  let fixture: ComponentFixture<AddEditCompanyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
