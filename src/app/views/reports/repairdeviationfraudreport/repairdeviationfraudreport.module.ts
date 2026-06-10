import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairdeviationfraudreportRoutingModule } from './repairdeviationfraudreport-routing.module';
import { RepairdeviationfraudreportComponent } from './repairdeviationfraudreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [DataFilterPipe],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    RepairdeviationfraudreportRoutingModule,
    SpinnerModule
  ]
})
export class RepairdeviationfraudreportModule {

  
 }
