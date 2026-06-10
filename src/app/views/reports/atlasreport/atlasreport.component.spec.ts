import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AtlasreportComponent } from './atlasreport.component';

describe('AtlasreportComponent', () => {
  let component: AtlasreportComponent;
  let fixture: ComponentFixture<AtlasreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AtlasreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
