import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlDcComponent } from './dl-dc.component';

describe('DlDcComponent', () => {
  let component: DlDcComponent;
  let fixture: ComponentFixture<DlDcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlDcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
