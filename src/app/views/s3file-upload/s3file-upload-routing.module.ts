import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { S3fileUploadComponent } from './s3file-upload.component';

const routes: Routes = [
  { path: '',  component: S3fileUploadComponent, data: { title: 's3file-upload' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class S3fileUploadRoutingModule { }
