import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CEODashboardComponent } from './ceo-dashboard.component';
import { CEODashboardRoutingModule } from './ceo-dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { TargetEntryComponent } from './target-entry/target-entry.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { GtagModule } from 'angular-gtag';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { ChartjsModule } from '@coreui/angular-chartjs';

@NgModule({
  declarations: [
    CEODashboardComponent
  ],
  imports: [ChartjsModule,
    CommonModule,
    CEODashboardRoutingModule,
    FormsModule,
    SpinnerModule,
    TargetEntryComponent,
    NgxGoogleAnalyticsModule.forRoot('G-MBQY631RGR' )
  ]
})
export class CEODashboardModule { }
