import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessoryenquiryreportComponent } from './accessoryenquiryreport.component';
const routes: Routes = [
  {
    path: '',
    component: AccessoryenquiryreportComponent,
    data: {
      title: 'Accessory Enquiry Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessoryenquiryreportRoutingModule { }
