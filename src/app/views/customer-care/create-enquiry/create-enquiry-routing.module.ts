import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEnquiryComponent } from './create-enquiry.component';

const routes: Routes = [
  { path: '', component: CreateEnquiryComponent, data: { title: 'Create Enquiry'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEnquiryRoutingModule { }
