import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvrreportComponent } from './svrreport.component';

describe('SvrreportComponent', () => {
  let component: SvrreportComponent;
  let fixture: ComponentFixture<SvrreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvrreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvrreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
