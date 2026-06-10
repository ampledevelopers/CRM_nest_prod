import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ChangeTicketStatusRoutingModule } from './change-ticket-status-routing.module';
import { ChangeTicketStatusComponent } from './change-ticket-status.component';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [ChangeTicketStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ChangeTicketStatusRoutingModule,
    SpinnerModule
  ],
  providers: [],
})
export class ChangeTicketStatusModule { }
