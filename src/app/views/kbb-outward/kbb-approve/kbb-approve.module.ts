import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KbbApproveRoutingModule } from './kbb-approve-routing.module';
import { SpinnerModule } from '@coreui/angular-pro';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KbbApproveRoutingModule,
    FormsModule,
    DataTablesModule,
    NgxPaginationModule,
    SpinnerModule
  ]
})
export class KbbApproveModule { }
