import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyDashboardBiComponent } from './daily-dashboard-bi.component';
const routes: Routes = [{
  path: '',
  component: DailyDashboardBiComponent,
  data: {
    title: 'Daily Dashboard - BI'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyDashboardBiRoutingModule { }
