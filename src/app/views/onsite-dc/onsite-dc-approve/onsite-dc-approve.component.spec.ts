import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OnsiteDcApproveComponent } from './onsite-dc-approve.component';

describe('OnsiteDcApproveComponent', () => {
  let component: OnsiteDcApproveComponent;
  let fixture: ComponentFixture<OnsiteDcApproveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteDcApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteDcApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
