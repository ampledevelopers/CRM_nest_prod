import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { StockTransferOutRoutingModule } from './stock-transfer-out-routing.module';
import { StockTransferOutComponent } from './stock-transfer-out.component';


@NgModule({
  declarations: [
    StockTransferOutComponent
  ],
  imports: [
    CommonModule,
    StockTransferOutRoutingModule,
    FormsModule,
    DataTablesModule
  ]
})
export class StockTransferOutModule { }
