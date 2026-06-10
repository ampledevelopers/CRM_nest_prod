import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsignmentstockstatusreportComponent } from './consignmentstockstatusreport.component';
const routes: Routes = [
  {
    path: '',
    component: ConsignmentstockstatusreportComponent,
    data: {
      title: 'Consignment Stock Status Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsignmentstockstatusreportRoutingModule { }
