import { ResetpasswordComponent } from './../resetpassword/resetpassword.component';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';


describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
