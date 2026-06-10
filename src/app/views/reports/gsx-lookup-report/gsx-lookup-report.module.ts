import { SpinnerModule } from '@coreui/angular-pro';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GsxLookupReportRoutingModule } from './gsx-lookup-report-routing.module';
import { GsxLookupReportComponent } from './gsx-lookup-report.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    GsxLookupReportRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class GsxLookupReportModule { }
