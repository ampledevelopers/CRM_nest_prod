import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketDetailsEditRoutingModule } from './ticket-details-edit-routing.module';
import { TicketDetailsEditComponent } from './ticket-details-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [TicketDetailsEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule,
    TicketDetailsEditRoutingModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  providers: [],
})
export class TicketDetailsEditModule { }
