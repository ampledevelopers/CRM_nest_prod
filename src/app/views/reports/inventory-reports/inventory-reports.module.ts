import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryReportsRoutingModule } from './inventory-reports-routing.module';
import { InventoryreportComponent } from '../inventoryreport/inventoryreport.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InventoryReportsRoutingModule,
    NgSelectModule,
    FormsModule
  ]
})
export class InventoryReportsModule { }
