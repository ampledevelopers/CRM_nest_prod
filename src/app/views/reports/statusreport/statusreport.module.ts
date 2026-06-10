import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusreportRoutingModule } from './statusreport-routing.module';
import { StatusreportComponent } from './statusreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    StatusreportRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class StatusreportModule { }
