import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OnsiteDcComponent } from './onsite-dc.component';

describe('OnsiteDcComponent', () => {
  let component: OnsiteDcComponent;
  let fixture: ComponentFixture<OnsiteDcComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteDcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
