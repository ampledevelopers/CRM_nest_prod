import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuarterlyreportRoutingModule } from './quarterlyreport-routing.module';
import { QuarterlyreportComponent } from './quarterlyreport.component';
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
    QuarterlyreportRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class QuarterlyreportModule { }
