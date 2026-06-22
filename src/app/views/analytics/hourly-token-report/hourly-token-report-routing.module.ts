import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyTokenReportComponent } from './hourly-token-report.component';

const routes: Routes = [
  {
    path: '',
    component: HourlyTokenReportComponent,
    data: {
      title: 'Hourly Token Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HourlyTokenReportRoutingModule { }
