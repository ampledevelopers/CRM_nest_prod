import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TicketdetailComponent } from './ticketdetail.component';

describe('TicketdetailComponent', () => {
  let component: TicketdetailComponent;
  let fixture: ComponentFixture<TicketdetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
