import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianPerformanceBiRoutingModule } from './technician-performance-bi-routing.module';
import { TechnicianPerformanceBiComponent } from './technician-performance-bi.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    TechnicianPerformanceBiRoutingModule,TechnicianPerformanceBiComponent
  ]
})
export class TechnicianPerformanceBiModule { }
