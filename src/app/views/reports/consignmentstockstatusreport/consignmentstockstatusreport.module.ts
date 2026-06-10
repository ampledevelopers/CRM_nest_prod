import { SpinnerModule } from '@coreui/angular-pro';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsignmentstockstatusreportRoutingModule } from './consignmentstockstatusreport-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    ConsignmentstockstatusreportRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class ConsignmentstockstatusreportModule { }
