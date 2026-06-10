import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CcTicketDetailComponent } from './cc-ticket-detail.component';

describe('CcTicketDetailComponent', () => {
  let component: CcTicketDetailComponent;
  let fixture: ComponentFixture<CcTicketDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CcTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
