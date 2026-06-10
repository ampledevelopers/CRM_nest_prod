import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WinTicketdetailComponent } from './win-ticketdetail.component';

describe('TicketdetailComponent', () => {
  let component: WinTicketdetailComponent;
  let fixture: ComponentFixture<WinTicketdetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinTicketdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinTicketdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
