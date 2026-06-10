import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryDashboardBiRoutingModule } from './inventory-dashboard-bi-routing.module';
import { InventoryDashboardBiComponent } from './inventory-dashboard-bi.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    InventoryDashboardBiRoutingModule,InventoryDashboardBiComponent
  ]
})
export class InventoryDashboardBiModule { }
