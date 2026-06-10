import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SvrDashboardComponent} from './svr-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: SvrDashboardComponent,
    data: {
      title: 'SVR 2Hrs Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SvrDashboardRoutingModule { }
