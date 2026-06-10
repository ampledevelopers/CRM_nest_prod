import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsignmentReportRoutingModule } from './consignment-report-routing.module';
import { ConsignmentReportComponent } from './consignment-report.component';

@NgModule({
  imports: [
    CommonModule,
    ConsignmentReportRoutingModule,
    ConsignmentReportComponent
  ]
})
export class ConsignmentReportModule { }
