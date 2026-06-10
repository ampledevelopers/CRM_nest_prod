import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TekneTicketdetailComponent } from './tekne-ticketdetail.component';

const routes: Routes = [
  {
    path: '',
    component: TekneTicketdetailComponent,
    data: {
      title: 'Detail'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TekneTicketdetailRoutingModule { }
