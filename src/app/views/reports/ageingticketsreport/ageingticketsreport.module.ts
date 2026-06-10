import { SpinnerModule } from '@coreui/angular-pro';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgeingticketsreportRoutingModule } from './ageingticketsreport-routing.module';
import { AgeingticketsreportComponent } from './ageingticketsreport.component';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';


@NgModule({
  declarations: [],
  imports: [DataFilterPipe,
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    AgeingticketsreportRoutingModule,
    SpinnerModule
  ]
})
export class AgeingticketsreportModule { }
