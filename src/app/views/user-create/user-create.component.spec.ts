import { RelocateEnggComponent } from './../relocate-engg/relocate-engg.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


describe('RelocateEnggComponent', () => {
  let component: RelocateEnggComponent;
  let fixture: ComponentFixture<RelocateEnggComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelocateEnggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelocateEnggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
