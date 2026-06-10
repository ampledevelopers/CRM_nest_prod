import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinTicketdetailComponent } from './win-ticketdetail.component';

const routes: Routes = [
  {
    path: '',
    component: WinTicketdetailComponent,
    data: {
      title: 'Detail'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinTicketdetailRoutingModule { }
