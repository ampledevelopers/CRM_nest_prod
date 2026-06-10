import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SvrNonsvrAgeingDashboardComponent} from './svr-nonsvr-ageing-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: SvrNonsvrAgeingDashboardComponent,
    data: {
      title: 'SVR and NonSvr Bin Ageing Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SvrNonsvrAgeingDashboardRoutingModule { }
