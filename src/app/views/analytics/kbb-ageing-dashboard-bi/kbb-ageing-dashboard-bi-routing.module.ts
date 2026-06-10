import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KbbAgeingDashboardBiComponent} from './kbb-ageing-dashboard-bi.component';
const routes: Routes = [
  {
    path: '',
    component: KbbAgeingDashboardBiComponent,
    data: {
      title: 'KBB Ageing Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KbbAgeingDashboardBiRoutingModule { }
