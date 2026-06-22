import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyTokenReportRoutingModule } from './hourly-token-report-routing.module';
import { HourlyTokenReportComponent } from './hourly-token-report.component';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HourlyTokenReportRoutingModule,
    HourlyTokenReportComponent,
    SpinnerModule
  ]
})
export class HourlyTokenReportModule { }
