import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccySalesRunRateBiRoutingModule } from './accy-sales-run-rate-bi-routing.module';
import { AccySalesRunRateBiComponent } from './accy-sales-run-rate-bi.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    AccySalesRunRateBiRoutingModule,AccySalesRunRateBiComponent
  ]
})
export class AccySalesRunRateBiModule { }
