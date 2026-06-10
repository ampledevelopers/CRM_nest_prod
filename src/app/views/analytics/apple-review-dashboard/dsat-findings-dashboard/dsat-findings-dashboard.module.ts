import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsatFindingsDashboardRoutingModule } from './dsat-findings-dashboard-routing.module';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DsatFindingsDashboardRoutingModule,
    SpinnerModule
  ]
})
export class DsatFindingsDashboardModule { }
