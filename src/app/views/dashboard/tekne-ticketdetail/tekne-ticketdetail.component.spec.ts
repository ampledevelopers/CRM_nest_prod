import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TekneTicketdetailComponent } from './tekne-ticketdetail.component';

describe('TicketdetailComponent', () => {
  let component: TekneTicketdetailComponent;
  let fixture: ComponentFixture<TekneTicketdetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TekneTicketdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TekneTicketdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
