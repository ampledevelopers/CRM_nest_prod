import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketDetailsEditComponent } from './ticket-details-edit.component';
const routes: Routes = [
  { path: '',  component: TicketDetailsEditComponent, data: { title: 'Ticket Edit'}}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketDetailsEditRoutingModule { }
