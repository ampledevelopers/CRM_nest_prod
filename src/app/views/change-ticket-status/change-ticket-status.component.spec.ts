import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeTicketStatusComponent } from './change-ticket-status.component';

describe('ChangeTicketStatusComponent', () => {
  let component: ChangeTicketStatusComponent;
  let fixture: ComponentFixture<ChangeTicketStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTicketStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTicketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
