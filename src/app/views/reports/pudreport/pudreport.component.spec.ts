import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUDreportComponent } from './pudreport.component';

describe('PUDreportComponent', () => {
  let component: PUDreportComponent;
  let fixture: ComponentFixture<PUDreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PUDreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PUDreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
