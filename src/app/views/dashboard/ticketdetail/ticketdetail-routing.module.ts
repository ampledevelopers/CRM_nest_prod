import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketdetailComponent } from './ticketdetail.component';

const routes: Routes = [
  {
    path: '',
    component: TicketdetailComponent,
    data: {
      title: 'Detail'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketdetailRoutingModule { }
