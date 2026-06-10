import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsatPeriodReportComponent } from './csat-period-report.component';

const routes: Routes = [
  {
    path: '',
    component: CsatPeriodReportComponent,
    data: {
      title: 'csat-period-dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsatPeriodReportRoutingModule { }
