import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeTicketStatusComponent } from './change-ticket-status.component';

const routes: Routes = [
  { path: '',  component: ChangeTicketStatusComponent, data: { title: 'Change Ticket Status'}}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeTicketStatusRoutingModule { }
