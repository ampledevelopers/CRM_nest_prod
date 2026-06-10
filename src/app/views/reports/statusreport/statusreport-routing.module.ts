import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusreportComponent } from './statusreport.component';
const routes: Routes = [
  {
    path: '',
    component: StatusreportComponent,
    data: {
      title: 'Tickets Status Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusreportRoutingModule { }
