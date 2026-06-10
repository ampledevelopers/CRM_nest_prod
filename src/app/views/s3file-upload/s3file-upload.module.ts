import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { S3fileUploadRoutingModule } from './s3file-upload-routing.module';
import { S3fileUploadComponent } from './s3file-upload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    S3fileUploadRoutingModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    S3fileUploadComponent,
  ]
})
export class S3fileUploadModule { }
