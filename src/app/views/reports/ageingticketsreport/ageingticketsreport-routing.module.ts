import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgeingticketsreportComponent } from './ageingticketsreport.component';

const routes: Routes = [
  {
    path: '',
    component: AgeingticketsreportComponent,
    data: {
      title: 'Ageing Tickets For SMS Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgeingticketsreportRoutingModule { }
