import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetEntryComponent } from './target-entry.component';

describe('TargetEntryComponent', () => {
  let component: TargetEntryComponent;
  let fixture: ComponentFixture<TargetEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
