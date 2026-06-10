import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PartAddEditComponent } from './part-add-edit.component';

describe('PartAddEditComponent', () => {
  let component: PartAddEditComponent;
  let fixture: ComponentFixture<PartAddEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PartAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
