import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianDashboardComponent } from './technician-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: TechnicianDashboardComponent,
    data: {
      title: 'Technician Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianDashboardRoutingModule { }
