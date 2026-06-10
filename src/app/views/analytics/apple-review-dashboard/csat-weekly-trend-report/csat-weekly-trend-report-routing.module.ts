import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsatWeeklyTrendReportComponent } from './csat-weekly-trend-report.component';

const routes: Routes = [
  {
    path: '',
    component: CsatWeeklyTrendReportComponent,
    data: {
      title: 'csat-weekly-trend-dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsatWeeklyTrendReportRoutingModule { }
