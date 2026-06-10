import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EligibleTicketsDashboardRoutingModule } from './eligible-tickets-dashboard-routing.module';
import { EligibleTicketsDashboardComponent } from './eligible-tickets-dashboard.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EligibleTicketsDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    EligibleTicketsDashboardRoutingModule,
    SpinnerModule
  ]
})
export class EligibleTicketsDashboardModule { }
