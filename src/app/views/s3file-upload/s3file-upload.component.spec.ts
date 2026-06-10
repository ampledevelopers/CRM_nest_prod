import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3fileUploadComponent } from './s3file-upload.component';

describe('S3fileUploadComponent', () => {
  let component: S3fileUploadComponent;
  let fixture: ComponentFixture<S3fileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S3fileUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S3fileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
