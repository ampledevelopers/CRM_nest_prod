import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayreportComponent } from './dayreport.component';
const routes: Routes = [
  {
    path: '',
    component: DayreportComponent,
    data: {
      title: 'Day Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayreportRoutingModule { }
