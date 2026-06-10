import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TechnicianPerformanceComponent } from './technician-performance/technician-performance.component';
import { SdrDashboardComponent } from './sdr-dashboard/sdr-dashboard.component';
import { TechnicianPerformanceNegetiveComponent } from './technician-performance-negetive/technician-performance-negetive.component';
import { DayReportComponent } from './day-report/day-report.component';
import { BADHomePageComponent } from './bad-home-page/bad-home-page.component';
import { DLBinAgeingComponent } from './dl-bin-ageing/dl-bin-ageing.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BinAgeingDashboardComponent } from './bin-ageing-dashboard/bin-ageing-dashboard.component';

@NgModule({
  declarations: [TechnicianPerformanceComponent,TechnicianPerformanceNegetiveComponent,DayReportComponent, BADHomePageComponent, DLBinAgeingComponent, BinAgeingDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    AnalyticsRoutingModule,
    SpinnerModule,
    ChartjsModule,
    NgSelectModule,
    NgbModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,AnalyticsComponent
  ]
})
export class AnalyticsModule { }
