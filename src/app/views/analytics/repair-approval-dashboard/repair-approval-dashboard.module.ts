import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
import { RepairApprovalDashboardRoutingModule } from './repair-approval-dashboard-routing.module';
import { RepairApprovalDashboardComponent } from './repair-approval-dashboard.component';

@NgModule({
  declarations: [
    RepairApprovalDashboardComponent
  ],
  imports: [
    CommonModule,
    RepairApprovalDashboardRoutingModule,
    FormsModule,
    SpinnerModule
  ]
})
export class RepairApprovalDashboardModule { }
