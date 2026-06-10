import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TatReportRoutingModule } from './tat-report-routing.module';
import { TatReportComponent } from './tat-report.component';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [TatReportComponent],
  imports: [
    CommonModule,
    TatReportRoutingModule,
    FormsModule,
    NgSelectModule,
    FormsModule,
    SpinnerModule,
    EscapeHtmlPipe
  ]
})
export class TatReportModule { }
