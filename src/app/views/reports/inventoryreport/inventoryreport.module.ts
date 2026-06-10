import { SpinnerModule } from '@coreui/angular-pro';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryreportRoutingModule } from './inventoryreport-routing.module';
import { InventoryreportComponent } from './inventoryreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { WeekPipe } from './week.pipe';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    InventoryreportRoutingModule,
    SpinnerModule,
    DataFilterPipe,
    WeekPipe
  ]
})
export class InventoryreportModule { }
