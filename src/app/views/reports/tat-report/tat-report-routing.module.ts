import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TatReportComponent } from './tat-report.component';
const routes: Routes = [
  {
    path: '',
    component: TatReportComponent,
    data: {
      title: 'TAT Report'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TatReportRoutingModule { }
