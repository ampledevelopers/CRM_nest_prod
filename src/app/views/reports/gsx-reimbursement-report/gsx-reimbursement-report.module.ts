import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTableModule } from '@coreui/angular-pro';
import { GsxReimbursementReportRoutingModule } from './gsx-reimbursement-report-routing.module';
import { GsxReimbursementReportComponent } from './gsx-reimbursement-report.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [
    GsxReimbursementReportComponent
  ],
  imports: [
    CommonModule,
    GsxReimbursementReportRoutingModule,
    SmartTableModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule
  ]
})
export class GsxReimbursementReportModule { }
