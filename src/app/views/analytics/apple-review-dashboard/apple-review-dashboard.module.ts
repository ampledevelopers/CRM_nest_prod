import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppleReviewDashboardRoutingModule } from './apple-review-dashboard-routing.module';
import { AppleReviewDashboardComponent } from './apple-review-dashboard.component';
import { CsatPeriodReportComponent } from './csat-period-report/csat-period-report.component';
import { CsatWeeklyTrendReportComponent } from './csat-weekly-trend-report/csat-weekly-trend-report.component';
import { FootFallDashboardComponent } from './foot-fall-dashboard/foot-fall-dashboard.component';
import { DsatFindingsDashboardComponent } from './dsat-findings-dashboard/dsat-findings-dashboard.component';
import { RepairsCoverageDashboardComponent } from './repairs-coverage-dashboard/repairs-coverage-dashboard.component';
import { QualityProgramDashboardComponent } from './quality-program-dashboard/quality-program-dashboard.component';
import { ProductRepairsDashboardComponent } from './product-repairs-dashboard/product-repairs-dashboard.component';

@NgModule({
  declarations: [
    AppleReviewDashboardComponent, CsatPeriodReportComponent, CsatWeeklyTrendReportComponent, FootFallDashboardComponent, DsatFindingsDashboardComponent,
    RepairsCoverageDashboardComponent
  ],
  imports: [
    CommonModule,
    AppleReviewDashboardRoutingModule,
    FormsModule,
    SpinnerModule,
    NgbModule,
    NgSelectModule

  ]
})
export class AppleReviewDashboardModule { }
