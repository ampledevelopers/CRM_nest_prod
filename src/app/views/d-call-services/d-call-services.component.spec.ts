import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCallServicesComponent } from './d-call-services.component';

describe('DCallServicesComponent', () => {
  let component: DCallServicesComponent;
  let fixture: ComponentFixture<DCallServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DCallServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DCallServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
