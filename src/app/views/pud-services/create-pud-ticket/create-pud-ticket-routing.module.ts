import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePudTicketComponent } from './create-pud-ticket.component';

const routes: Routes = [{
  path: '',  component: CreatePudTicketComponent,
  data: { title: 'create-PUD-ticket'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePudTicketRoutingModule { }
