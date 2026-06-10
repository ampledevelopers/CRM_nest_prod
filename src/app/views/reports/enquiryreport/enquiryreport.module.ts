import { SpinnerModule } from '@coreui/angular-pro';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiryreportRoutingModule } from './enquiryreport-routing.module';
import { EnquiryreportComponent } from './enquiryreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    EnquiryreportRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class EnquiryreportModule { }
