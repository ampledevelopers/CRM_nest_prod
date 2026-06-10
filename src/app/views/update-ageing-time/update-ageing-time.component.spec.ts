import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateAgeingTimeComponent } from './update-ageing-time.component';

describe('UpdateAgeingTimeComponent', () => {
  let component: UpdateAgeingTimeComponent;
  let fixture: ComponentFixture<UpdateAgeingTimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAgeingTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAgeingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
