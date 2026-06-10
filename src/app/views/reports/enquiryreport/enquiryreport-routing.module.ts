import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnquiryreportComponent } from './enquiryreport.component';
const routes: Routes = [
  {
    path: '',
    component: EnquiryreportComponent,
    data: {
      title: 'Enquiry Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryreportRoutingModule { }
