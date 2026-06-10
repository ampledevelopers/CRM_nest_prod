import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenulogreportComponent } from './menulogreport.component';

describe('MenulogreportComponent', () => {
  let component: MenulogreportComponent;
  let fixture: ComponentFixture<MenulogreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenulogreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenulogreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
