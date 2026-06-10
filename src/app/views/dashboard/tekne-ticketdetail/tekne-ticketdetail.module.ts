import { SpinnerModule } from '@coreui/angular-pro';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardService } from '../dashboard.service';
import { FormsModule } from '@angular/forms';
import { TekneTicketdetailRoutingModule } from './tekne-ticketdetail-routing.module';

@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    TekneTicketdetailRoutingModule,
    FormsModule,
    SpinnerModule,
  ],
  providers: [DashboardService]
})
export class TekneTicketdetailModule { }
