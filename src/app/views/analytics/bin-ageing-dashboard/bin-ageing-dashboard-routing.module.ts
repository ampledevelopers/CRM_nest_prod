import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinAgeingDashboardComponent} from './bin-ageing-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: BinAgeingDashboardComponent,
    data: {
      title: 'Bin Ageing Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BinAgeingDashboardRoutingModule { }
