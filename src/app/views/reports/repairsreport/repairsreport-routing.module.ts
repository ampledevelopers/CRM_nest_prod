import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairsreportComponent } from './repairsreport.component';
const routes: Routes = [
  {
    path: '',
    component: RepairsreportComponent,
    data: {
      title: 'Repairs Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairsreportRoutingModule { }
