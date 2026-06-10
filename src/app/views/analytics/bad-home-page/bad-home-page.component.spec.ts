import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BADHomePageComponent } from './bad-home-page.component';

describe('BADHomePageComponent', () => {
  let component: BADHomePageComponent;
  let fixture: ComponentFixture<BADHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BADHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BADHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
