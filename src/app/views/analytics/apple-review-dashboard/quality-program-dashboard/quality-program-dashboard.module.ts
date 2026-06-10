import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualityProgramDashboardRoutingModule } from './quality-program-dashboard-routing.module';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    QualityProgramDashboardRoutingModule,
    SpinnerModule
  ]
})
export class QualityProgramDashboardModule { }
