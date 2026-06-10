import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewTicketComponent } from './new-ticket.component';

describe('NewTicketComponent', () => {
  let component: NewTicketComponent;
  let fixture: ComponentFixture<NewTicketComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
