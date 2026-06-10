import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekneTicketDetailsEditComponent } from './tekne-ticket-details-edit.component';

describe('TekneTicketDetailsEditComponent', () => {
  let component: TekneTicketDetailsEditComponent;
  let fixture: ComponentFixture<TekneTicketDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TekneTicketDetailsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TekneTicketDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
