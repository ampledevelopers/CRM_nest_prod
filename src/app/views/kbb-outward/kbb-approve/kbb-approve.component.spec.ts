import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbbApproveComponent } from './kbb-approve.component';

describe('KbbApproveComponent', () => {
  let component: KbbApproveComponent;
  let fixture: ComponentFixture<KbbApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbbApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbbApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
