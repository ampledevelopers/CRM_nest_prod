import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SvrDashboardBiComponent} from './svr-dashboard-bi.component';
const routes: Routes = [
  {
    path: '',
    component: SvrDashboardBiComponent,
    data: {
      title: 'SVR 2Hrs Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SvrDashboardBiRoutingModule { }
