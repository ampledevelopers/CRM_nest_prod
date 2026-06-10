import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TokenDashboardComponent } from './token-dashboard.component';

describe('TokenDashboardComponent', () => {
  let component: TokenDashboardComponent;
  let fixture: ComponentFixture<TokenDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
