import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvrreportRoutingModule } from './svrreport-routing.module';
import { SvrreportComponent } from './svrreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    SvrreportRoutingModule,DataFilterPipe
  ]
})
export class SvrreportModule { }
