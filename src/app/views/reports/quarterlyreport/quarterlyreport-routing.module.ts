import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuarterlyreportComponent } from './quarterlyreport.component';
const routes: Routes = [
  {
    path: '',
    component: QuarterlyreportComponent,
    data: {
      title: 'Quarterly Report'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuarterlyreportRoutingModule { }
