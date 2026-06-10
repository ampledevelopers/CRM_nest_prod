import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcFormComponent } from './dc-form.component';

describe('DcFormComponent', () => {
  let component: DcFormComponent;
  let fixture: ComponentFixture<DcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
