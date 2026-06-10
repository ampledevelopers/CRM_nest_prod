import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KgbInwardComponent } from './kgb-inward.component';

describe('KgbInwardComponent', () => {
  let component: KgbInwardComponent;
  let fixture: ComponentFixture<KgbInwardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KgbInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KgbInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
