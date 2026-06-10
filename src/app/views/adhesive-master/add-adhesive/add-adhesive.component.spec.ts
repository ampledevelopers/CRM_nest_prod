import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdhesiveComponent } from './add-adhesive.component';

describe('AddAdhesiveComponent', () => {
  let component: AddAdhesiveComponent;
  let fixture: ComponentFixture<AddAdhesiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdhesiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdhesiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
