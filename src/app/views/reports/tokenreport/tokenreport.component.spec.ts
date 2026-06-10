import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TokenreportComponent } from './tokenreport.component';

describe('TokenreportComponent', () => {
  let component: TokenreportComponent;
  let fixture: ComponentFixture<TokenreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
