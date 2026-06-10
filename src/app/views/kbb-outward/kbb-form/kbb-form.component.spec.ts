import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KbbFormComponent } from './kbb-form.component';

describe('KbbFormComponent', () => {
  let component: KbbFormComponent;
  let fixture: ComponentFixture<KbbFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KbbFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
