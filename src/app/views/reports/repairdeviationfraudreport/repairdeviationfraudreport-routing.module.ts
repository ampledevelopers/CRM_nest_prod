import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairdeviationfraudreportComponent } from './repairdeviationfraudreport.component';
const routes: Routes = [
  {
    path: '',
    component: RepairdeviationfraudreportComponent,
    data: {
      title: 'Repair Deviation & Fraud Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairdeviationfraudreportRoutingModule { }
