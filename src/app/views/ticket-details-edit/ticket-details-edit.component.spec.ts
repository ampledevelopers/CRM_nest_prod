import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TicketDetailsEditComponent } from './ticket-details-edit.component';

describe('TicketDetailsEditComponent', () => {
  let component: TicketDetailsEditComponent;
  let fixture: ComponentFixture<TicketDetailsEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
