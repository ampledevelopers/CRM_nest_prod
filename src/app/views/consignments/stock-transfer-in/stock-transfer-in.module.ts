import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { StockTransferInRoutingModule } from './stock-transfer-in-routing.module';
import { StockTransferInComponent } from './stock-transfer-in.component';


@NgModule({
  declarations: [
    StockTransferInComponent
  ],
  imports: [
    CommonModule,
    StockTransferInRoutingModule,
    DataTablesModule,
    FormsModule
  ]
})
export class StockTransferInModule { }
