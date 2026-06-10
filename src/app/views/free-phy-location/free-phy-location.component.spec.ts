import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FreePhyLocationComponent } from './free-phy-location.component';

describe('FreePhyLocationComponent', () => {
  let component: FreePhyLocationComponent;
  let fixture: ComponentFixture<FreePhyLocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FreePhyLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreePhyLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
