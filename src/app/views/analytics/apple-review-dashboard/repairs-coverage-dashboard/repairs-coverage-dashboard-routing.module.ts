import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairsCoverageDashboardComponent } from './repairs-coverage-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RepairsCoverageDashboardComponent,
    data: {
      title: 'repairs-coverage-dashboard'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairsCoverageDashboardRoutingModule { }
