import { SpinnerModule } from '@coreui/angular-pro';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketdetailRoutingModule } from './ticketdetail-routing.module';

import { DashboardService } from '../dashboard.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    TicketdetailRoutingModule,
    FormsModule,
    SpinnerModule,
  ],
  providers: [DashboardService]
})
export class TicketdetailModule { }
