import { CoreUIFormsModule } from './../../forms/forms.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinTicketdetailRoutingModule } from './win-ticketdetail-routing.module';

import { WinDashboardService } from '../win-dashboard.service';
import { TabsModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '@coreui/angular-pro';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WinTicketdetailRoutingModule,
    TabsModule,
    FormsModule,
    NavbarModule,
    SpinnerModule
  ],
  providers: [WinDashboardService]
})
export class WinTicketdetailModule { }
