import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairsreportRoutingModule } from './repairsreport-routing.module';
import { RepairsreportComponent } from './repairsreport.component';
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
    RepairsreportRoutingModule,
    DataFilterPipe
  ]
})
export class RepairsreportModule { }
