import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SdrDashboardRoutingModule } from './sdr-dashboard-routing.module';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SdrDashboardRoutingModule,
    SpinnerModule
  ]
})
export class SdrDashboardModule { }
