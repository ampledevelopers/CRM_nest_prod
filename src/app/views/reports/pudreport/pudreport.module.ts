import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PUDreportRoutingModule } from './pudreport-routing.module';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
import { DataTablesModule } from 'angular-datatables';
import { DataPipePipe } from './data-pipe.pipe';
@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    PUDreportRoutingModule,
    SpinnerModule,
    DataTablesModule,
    DataPipePipe
  ]
})
export class PUDreportModule { }
