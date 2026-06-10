import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DLBinAgeingComponent } from './dl-bin-ageing.component';

describe('DLBinAgeingComponent', () => {
  let component: DLBinAgeingComponent;
  let fixture: ComponentFixture<DLBinAgeingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DLBinAgeingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DLBinAgeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
