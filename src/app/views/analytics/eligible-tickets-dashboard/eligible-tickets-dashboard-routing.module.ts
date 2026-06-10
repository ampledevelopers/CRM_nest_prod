import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EligibleTicketsDashboardComponent} from './eligible-tickets-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: EligibleTicketsDashboardComponent,
    data: {
      title: '2Hrs Promise Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EligibleTicketsDashboardRoutingModule { }
