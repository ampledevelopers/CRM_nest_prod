import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusDashboardComponent} from './status-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: StatusDashboardComponent,
    data: {
      title: 'Tickets Status Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusDashboardRoutingModule { }
