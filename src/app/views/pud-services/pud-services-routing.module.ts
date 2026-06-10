import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PudServicesComponent } from './pud-services.component';
import { CreatePudTicketComponent } from './create-pud-ticket/create-pud-ticket.component';

const routes: Routes = [
  { path: '',  component: PudServicesComponent, data: { title: 'pud-service' } },
  { path: 'create-pud-ticket', component: CreatePudTicketComponent, data: { title: 'create-pud-ticket'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PudServicesRoutingModule { }
