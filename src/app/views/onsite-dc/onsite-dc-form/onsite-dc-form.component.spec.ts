import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OnsiteDcFormComponent } from './onsite-dc-form.component';

describe('OnsiteDcFormComponent', () => {
  let component: OnsiteDcFormComponent;
  let fixture: ComponentFixture<OnsiteDcFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteDcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteDcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
