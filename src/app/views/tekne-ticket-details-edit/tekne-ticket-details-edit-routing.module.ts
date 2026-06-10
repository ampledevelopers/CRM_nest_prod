import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TekneTicketDetailsEditComponent } from './tekne-ticket-details-edit.component';

const routes: Routes = [
  { path: '',  component: TekneTicketDetailsEditComponent, data: { title: 'Tekne Ticket Edit'}}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TekneTicketDetailsEditRoutingModule { }
