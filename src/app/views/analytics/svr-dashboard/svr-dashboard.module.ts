import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvrDashboardRoutingModule } from './svr-dashboard-routing.module';
import { SvrDashboardComponent } from './svr-dashboard.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SvrDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    SvrDashboardRoutingModule,
    SpinnerModule
  ]
})
export class SvrDashboardModule { }
