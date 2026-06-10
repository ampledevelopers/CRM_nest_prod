import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccySalesRunRateBiComponent } from './accy-sales-run-rate-bi.component';
const routes: Routes = [{
  path: '',
  component: AccySalesRunRateBiComponent,
  data: {
    title: 'Accy Sales Run Rate'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccySalesRunRateBiRoutingModule { }
