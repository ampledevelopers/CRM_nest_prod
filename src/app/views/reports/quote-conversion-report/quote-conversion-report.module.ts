import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@coreui/angular-pro';
import { QuoteConversionReportRoutingModule } from './quote-conversion-report-routing.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuoteConversionReportComponent } from './quote-conversion-report.component';

@NgModule({
  declarations: [
    QuoteConversionReportComponent
  ],
  imports: [
    CommonModule,
    QuoteConversionReportRoutingModule,
    SpinnerModule,
    FormsModule,
    NgSelectModule
  ]
})
export class QuoteConversionReportModule { }
