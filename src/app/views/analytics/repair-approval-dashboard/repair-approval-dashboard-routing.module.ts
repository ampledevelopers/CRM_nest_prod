import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairApprovalDashboardComponent } from './repair-approval-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RepairApprovalDashboardComponent,
    data: {
      title: 'repair-approval-dashboard'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairApprovalDashboardRoutingModule { }
