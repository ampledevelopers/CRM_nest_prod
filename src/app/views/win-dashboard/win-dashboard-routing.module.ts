import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinDashboardComponent } from './win-dashboard.component';
import { WinTicketdetailComponent } from './win-ticketdetail/win-ticketdetail.component';

const routes: Routes = [
  { path: '',  component: WinDashboardComponent, data: { title: 'Dashboard' } },
  { path: 'ticket', component: WinTicketdetailComponent, data: { title: 'Detail' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinDashboardRoutingModule {}
