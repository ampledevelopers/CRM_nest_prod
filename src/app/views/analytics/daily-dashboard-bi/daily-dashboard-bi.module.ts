import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyDashboardBiRoutingModule } from './daily-dashboard-bi-routing.module';
import { DailyDashboardBiComponent } from './daily-dashboard-bi.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    DailyDashboardBiRoutingModule,DailyDashboardBiComponent
  ]
})
export class DailyDashboardBiModule { }
