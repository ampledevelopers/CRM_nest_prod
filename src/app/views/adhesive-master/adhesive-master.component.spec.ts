import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhesiveMasterComponent } from './adhesive-master.component';

describe('AdhesiveMasterComponent', () => {
  let component: AdhesiveMasterComponent;
  let fixture: ComponentFixture<AdhesiveMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhesiveMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhesiveMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
