import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KbbAgeingDashboardComponent} from './kbb-ageing-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: KbbAgeingDashboardComponent,
    data: {
      title: 'KBB Ageing Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KbbAgeingDashboardRoutingModule { }
