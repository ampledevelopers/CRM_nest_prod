import { SpinnerModule } from '@coreui/angular-pro';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GsxFlatReportRoutingModule } from './gsx-flat-report-routing.module';
import { GsxFlatReportComponent } from './gsx-flat-report.component';


@NgModule({
  declarations: [
    GsxFlatReportComponent
  ],
  imports: [
    CommonModule,
    GsxFlatReportRoutingModule,
    SpinnerModule,
    NgSelectModule,
    FormsModule
  ]
})
export class GsxFlatReportModule { }
