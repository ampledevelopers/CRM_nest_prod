import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcseFormComponent } from './acse-form.component';

describe('AcseFormComponent', () => {
  let component: AcseFormComponent;
  let fixture: ComponentFixture<AcseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
