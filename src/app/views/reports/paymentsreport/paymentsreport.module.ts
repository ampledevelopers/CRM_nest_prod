import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsreportRoutingModule } from './paymentsreport-routing.module';
import { PaymentsreportComponent } from './paymentsreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [PaymentsreportComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    PaymentsreportRoutingModule,
    SpinnerModule,
    NgxPaginationModule
  ]
})
export class PaymentsreportModule { }
