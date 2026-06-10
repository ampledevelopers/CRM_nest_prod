import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnsitereportRoutingModule } from './onsitereport-routing.module';
import { OnsitereportComponent } from './onsitereport.component';
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
    OnsitereportRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class OnsitereportModule { }
