import { TekneTicketdetailComponent } from './tekne-ticketdetail/tekne-ticketdetail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TicketdetailComponent } from './ticketdetail/ticketdetail.component';

const routes: Routes = [
  { path: '',  component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'ticket', component: TicketdetailComponent, data: { title: 'Detail' } },
  { path: 'tekne-ticket', component: TekneTicketdetailComponent, data: { title: 'Detail' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
