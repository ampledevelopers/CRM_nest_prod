import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePudTicketComponent } from './create-pud-ticket.component';

describe('CreatePudTicketComponent', () => {
  let component: CreatePudTicketComponent;
  let fixture: ComponentFixture<CreatePudTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePudTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePudTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
