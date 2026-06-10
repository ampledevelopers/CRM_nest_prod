import { TekneSearchDashboardComponent } from './tekne-search-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TekneSearchDashboardRoutingModule } from './tekne-search-dashboard-routing.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { SpinnerModule, ButtonModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [TekneSearchDashboardComponent],
  imports: [
    CommonModule,
    TekneSearchDashboardRoutingModule,
    FormsModule,
    NgSelectModule,
    DataTablesModule,
    SpinnerModule,
    ButtonModule
  ]
})
export class TekneSearchDashboardModule { }
